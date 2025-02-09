// bookings/bookings.service.ts
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Session } from '../sessions/session.entity';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BOOKING_REPOSITORY')
    private readonly bookingRepository: Repository<Booking>,
    @Inject('SESSION_REPOSITORY')
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    if (!createBookingDto.termsAccepted) {
      throw new BadRequestException('Terms and conditions must be accepted.');
    }

    // Validate session availability
    const sessionIds = createBookingDto.sessions.map(s => s.sessionId);
    const sessions = await this.sessionRepository.find({
      where: { id: In(sessionIds), available: true },
    });

    if (sessions.length !== sessionIds.length) {
      throw new BadRequestException('One or more sessions are no longer available.');
    }

    // Calculate total cost (example logic: price * (duration / 60))
    const totalCost = createBookingDto.sessions.reduce((total, session) => {
      return total + (session.price * (session.duration / 60));
    }, 0);

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      totalCost,
    });

    const savedBooking = await this.bookingRepository.save(booking);

    // Update sessions to mark them as unavailable
    for (const session of sessions) {
      session.available = false;
      await this.sessionRepository.save(session);
    }

    return savedBooking;
  }
}
