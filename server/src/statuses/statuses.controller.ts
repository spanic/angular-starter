import { Controller, Get } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesData } from 'src/shared/models/statuses-data.model';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  findAll(): Promise<StatusesData> {
    return this.statusesService.findAll();
  }
}
