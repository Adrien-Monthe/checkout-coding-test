// trainer.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { Trainer } from './trainer.entity';
import { ApiBody } from '@nestjs/swagger';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainerService: TrainersService) {}

  // GET /trainers - list all trainers
  @Get()
  async findAll(): Promise<Trainer[]> {
    return this.trainerService.findAll();
  }

  // GET /trainers/:id - get a specific trainer
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Trainer> {
    return this.trainerService.findOne(Number(id));
  }

  @Post()
  @ApiBody({ type: CreateTrainerDto })
  async create(@Body() trainerData: CreateTrainerDto): Promise<Trainer> {
    return this.trainerService.create(trainerData);
  }

  // PUT /trainers/:id - update an existing trainer
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() trainerData: Partial<Trainer>,
  ): Promise<Trainer> {
    return this.trainerService.update(Number(id), trainerData);
  }

  // DELETE /trainers/:id - delete a trainer
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.trainerService.remove(Number(id));
  }

  // GET /trainers/:id/sessions - returns sessions for a trainer
  @Get(':id/sessions')
  async getSessions(@Param('id') id: string): Promise<any> {
    return this.trainerService.findSessions(Number(id));
  }
}
