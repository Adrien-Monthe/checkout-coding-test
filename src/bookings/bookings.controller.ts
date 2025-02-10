// bookings/bookings.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.createBooking(createBookingDto);
  }

  // GET /bookings/:id/sessions - returns session details for a booking
  @Get(':id/sessions')
  async getBookingSessions(@Param('id') id: string): Promise<any> {
    return this.bookingsService.getBookingSessions(Number(id));
  }
}
