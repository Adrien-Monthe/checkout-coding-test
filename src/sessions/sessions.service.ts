import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Session, SessionType } from './session.entity';
import { Trainer } from '../trainers/trainer.entity';

@Injectable()
export class SessionsService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private readonly sessionRepository: Repository<Session>,
    @Inject('TRAINER_REPOSITORY')
    private readonly trainerRepository: Repository<Trainer>,
  ) {
  }

  async findAll(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  async isTrainerAvailable(
    trainerId: number,
    date: string,
    newStartTime: string,
    newEndTime: string,
  ): Promise<boolean> {
    const conflict = await this.sessionRepository
      .createQueryBuilder('session')
      .where('session.trainerId = :trainerId', { trainerId })
      .andWhere('session.date = :date', { date })
      .andWhere('session.startTime < :newEndTime', { newEndTime })
      .andWhere('session.endTime > :newStartTime', { newStartTime })
      .getOne();
    return !conflict;
  }

  async getTrainerHourlyRate(trainerId: number): Promise<number> {
    // Assuming you have a TrainerRepository or the SessionsService is capable of retrieving trainer details.
    // This is just an example. Adjust to your implementation.
    const trainer = await this.trainerRepository.findOne({ where: { id: trainerId } });
    if (!trainer) {
      throw new Error(`Trainer with id ${trainerId} not found.`);
    }
    return Number(trainer.pricePerHour);
  }

  /**
   * Creates session records based on an array of session DTOs and assigns them to a booking.
   *
   * @param sessions Array of session DTOs containing date, startTime, endTime, and trainerId.
   * @param bookingId The id of the booking to assign these sessions to.
   * @returns A Promise that resolves to an array of created Session entities.
   */
  async createSessionsFromBookingDto(
    sessions: {
      date: string;
      startTime: string;
      endTime: string;
      trainerId: number;
      type: SessionType;
    }[],
    bookingId: number,
  ): Promise<Session[]> {
    const createdSessions: Session[] = [];

    for (const sessionDto of sessions) {

      const session = this.sessionRepository.create({
        date: sessionDto.date,
        startTime: sessionDto.startTime,
        endTime: sessionDto.endTime,
        trainer: { id: sessionDto.trainerId } as any,
        booking: { id: bookingId } as any,
        type: sessionDto.type,
      });

      const savedSession = await this.sessionRepository.save(session);
      createdSessions.push(savedSession);
    }

    return createdSessions;
  }
}
