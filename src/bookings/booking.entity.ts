// bookings/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // Store session details in JSON format or normalize via relations if needed.
  @Column({ type: 'json' })
  sessions: {
    sessionId: number;
    duration: number;
    price: number;
  }[];

  @Column('decimal')
  totalCost: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
