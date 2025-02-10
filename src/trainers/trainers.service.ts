// trainer.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trainer } from './trainer.entity';

@Injectable()
export class TrainersService {
  constructor(
    @Inject('TRAINER_REPOSITORY')
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  // Get all trainers
  async findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find();
  }

  // Get a trainer by id
  async findOne(id: number): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne({ where: { id } });
    if (!trainer) {
      throw new NotFoundException(`Trainer with id ${id} not found.`);
    }
    return trainer;
  }

  // Create a new trainer
  async create(trainerData: Partial<Trainer>): Promise<Trainer> {
    const trainer = this.trainerRepository.create(trainerData);
    return this.trainerRepository.save(trainer);
  }

  // Update an existing trainer
  async update(id: number, trainerData: Partial<Trainer>): Promise<Trainer> {
    const trainer = await this.findOne(id);
    Object.assign(trainer, trainerData);
    return this.trainerRepository.save(trainer);
  }

  // Remove a trainer by id
  async remove(id: number): Promise<void> {
    const trainer = await this.findOne(id);
    await this.trainerRepository.delete(trainer.id);
  }
}
