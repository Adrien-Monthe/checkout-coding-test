// bookings/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Session } from '../sessions/session.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @Column()
  clientPhone: string;

  @Column('decimal')
  totalCost: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Session, session => session.booking)
  sessions: Session[];
}
