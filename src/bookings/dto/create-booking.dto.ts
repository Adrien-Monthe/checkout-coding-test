import { SessionType } from '../../sessions/session.entity';

export class CreateBookingDto {

  clientName: string;


  clientEmail: string;


  clientPhone: string;

  sessions: {
    date: string;
    startTime: string;
    endTime: string;
    trainerId: number;
    type:SessionType;
  }[];

  termsAccepted: boolean;
}
