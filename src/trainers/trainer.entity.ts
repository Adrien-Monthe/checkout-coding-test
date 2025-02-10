// trainer/trainer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Session } from '../sessions/session.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  identifier: string;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerHour: number;

  @OneToMany(() => Session, session => session.trainer)
  sessions: Session[];
}

