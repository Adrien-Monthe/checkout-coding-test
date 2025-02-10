import { Module } from '@nestjs/common';
import { SessionsModule } from './sessions/sessions.module';
import { BookingsModule } from './bookings/bookings.module';
import { TrainersModule } from './trainers/trainers.module';

@Module({
  imports: [SessionsModule, BookingsModule, TrainersModule],
})
export class AppModule {}
