export class CreateBookingDto {

  clientName: string;


  clientEmail: string;


  clientPhone: string;

  sessions: {
    sessionId: number;
    duration: number;
    price: number;
  }[];

  termsAccepted: boolean;
}
