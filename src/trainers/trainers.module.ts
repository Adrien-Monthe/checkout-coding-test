// trainers/trainers.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { trainersProviders } from './trainers.providers';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...trainersProviders,
    TrainersService,
  ],
  controllers: [TrainersController],
  exports: [...trainersProviders, TrainersService],
})
export class TrainersModule {}
