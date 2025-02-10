// bookings/bookings.service.ts
import { Injectable, BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BOOKING_REPOSITORY')
    private readonly bookingRepository: Repository<Booking>,
    private readonly sessionsService: SessionsService
  ) {}

  /**
   * Calculates the duration in minutes between two time strings in "HH:MM:SS" format.
   */
  private calculateDurationInMinutes(startTime: string, endTime: string): number {
    const [startH, startM, startS] = startTime.split(':').map(Number);
    const [endH, endM, endS] = endTime.split(':').map(Number);
    const startDate = new Date(0, 0, 0, startH, startM, startS);
    const endDate = new Date(0, 0, 0, endH, endM, endS);
    let diff = (endDate.getTime() - startDate.getTime()) / 60000;
    if (diff < 0) {
      // Adjust for sessions crossing midnight.
      diff += 24 * 60;
    }
    return diff;
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    if (!createBookingDto.termsAccepted) {
      throw new BadRequestException('Terms and conditions must be accepted.');
    }

    let totalCost = 0;

    // Verify trainer availability and calculate cost for each session from the DTO.
    for (const sessionDto of createBookingDto.sessions) {
      const { trainerId, date, startTime, endTime } = sessionDto;

      // Check if the trainer is available at the given date and time.
      const isAvailable = await this.sessionsService.isTrainerAvailable(
        trainerId,
        date,
        startTime,
        endTime
      );

      if (!isAvailable) {
        throw new BadRequestException(
          `Trainer ${trainerId} is not available on ${date} from ${startTime} to ${endTime}.`
        );
      }

      // Calculate the duration and cost.
      const durationInMinutes = this.calculateDurationInMinutes(startTime, endTime);
      const hourlyRate = await this.sessionsService.getTrainerHourlyRate(trainerId);
      const sessionCost = Number(hourlyRate) * (durationInMinutes / 60);
      totalCost += sessionCost;
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      totalCost: totalCost,
    });

    const savedBooking = await this.bookingRepository.save(booking);

   await this.sessionsService.createSessionsFromBookingDto(createBookingDto.sessions, savedBooking.id);

    return savedBooking;
  }


  // New method to get sessions stored in a booking.
  async getBookingSessions(bookingId: number): Promise<any> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${bookingId} not found.`);
    }
    // Assuming booking.sessions stores the session details (e.g., as JSON).
    return booking.sessions;
  }
}
