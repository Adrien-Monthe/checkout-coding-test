import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  trainer: string;

  @Column()
  timeSlot: Date;

  @Column()
  duration: number; // in minutes

  @Column('decimal')
  price: number;

  @Column({ default: true })
  available: boolean;
}
