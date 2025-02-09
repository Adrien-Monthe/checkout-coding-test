// sessions/sessions.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { sessionProviders } from './session.providers';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...sessionProviders,
    SessionsService,
  ],
  controllers: [SessionsController],
  exports: [...sessionProviders, SessionsService],
})
export class SessionsModule {}
