import { DataSource } from 'typeorm';
import { Trainer } from './trainer.entity';

export const trainersProviders = [
  {
    provide: 'TRAINER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Trainer),
    inject: ['DATA_SOURCE'],
  },
];
