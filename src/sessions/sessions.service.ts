import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async findAll(): Promise<Session[]> {
    return this.sessionRepository.find({ where: { available: true } });
  }
}
