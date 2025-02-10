// bookings/bookings.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { ApiBody } from '@nestjs/swagger';
import { CalculateTotalPriceDto } from './dto/calculate-total-price.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    return this.bookingsService.createBooking(createBookingDto);
  }

  // GET /bookings/:id/sessions - returns session details for a booking
  @Get(':id/sessions')
  getBookingSessions(@Param('id') id: string): any {
    return this.bookingsService.getBookingSessions(Number(id));
  }

  // POST /bookings/total-price - Calculates and returns the total price for a list of sessions.
  @Post('total-price')
  @ApiBody({ type: CalculateTotalPriceDto })
  async calculateTotalPrice(
    @Body() dto: CalculateTotalPriceDto,
  ): Promise<{ totalPrice: number }> {
    const totalPrice = await this.bookingsService.calculateTotalPrice(
      dto.sessions,
    );
    return { totalPrice };
  }
}
