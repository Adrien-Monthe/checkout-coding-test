// sessions/session.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Trainer } from '../trainers/trainer.entity';
import { Booking } from '../bookings/booking.entity';

export enum SessionType {
  PADEL = 'padel',
  FITNESS = 'fitness',
  TENNIS = 'tennis',
}

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SessionType })
  type: SessionType;

  // Relationship to the Trainer entity
  @ManyToOne(() => Trainer, trainer => trainer.sessions, { eager: true })
  @JoinColumn({ name: 'trainerId' })
  trainer: Trainer;

  @ManyToOne(() => Booking, booking => booking.sessions, { eager: true })
  @JoinColumn({ name: 'bookingId' })
  booking: Trainer;

  // The date on which the session takes place (YYYY-MM-DD)
  @Column({ type: 'date' })
  date: string;

  // The start time of the session (HH:MM:SS)
  @Column({ type: 'time' })
  startTime: string;

  // The end time of the session (HH:MM:SS)
  @Column({ type: 'time' })
  endTime: string;
}
