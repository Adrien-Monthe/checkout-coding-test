import { Controller, Get } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async getSessions(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }
}
