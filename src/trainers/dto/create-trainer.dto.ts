import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDto {
  @ApiProperty({
    description: 'The full name of the trainer.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'A unique identifier for the trainer.',
    example: 'JD123',
  })
  identifier: string;

  @ApiProperty({
    description: 'Price per hour for the trainer in USD.',
    example: 75.50,
  })
  pricePerHour: number;
}
