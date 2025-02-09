// bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { bookingProviders } from './booking.providers';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
// You can import sessionProviders here as well if they are not provided elsewhere.
import { sessionProviders } from '../sessions/session.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...bookingProviders,
    ...sessionProviders, // Ensure SESSION_REPOSITORY is available
    BookingsService,
  ],
  controllers: [BookingsController],
})
export class BookingsModule {}
