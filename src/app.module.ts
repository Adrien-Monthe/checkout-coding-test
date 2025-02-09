import { Module } from '@nestjs/common';
import { SessionsModule } from './sessions/sessions.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [SessionsModule, BookingsModule],
})
export class AppModule {
}
