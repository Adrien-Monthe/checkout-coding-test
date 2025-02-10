import { ApiProperty } from '@nestjs/swagger';

export class SessionPriceDto {
  @ApiProperty({ description: 'Trainer id', example: 1 })
  trainerId: number;

  @ApiProperty({ description: 'Session date (YYYY-MM-DD)', example: '2025-03-15' })
  date: string;

  @ApiProperty({ description: 'Session start time (HH:MM:SS)', example: '09:00:00' })
  startTime: string;

  @ApiProperty({ description: 'Session end time (HH:MM:SS)', example: '10:30:00' })
  endTime: string;
}

export class CalculateTotalPriceDto {
  @ApiProperty({ type: [SessionPriceDto] })
  sessions: SessionPriceDto[];
}
