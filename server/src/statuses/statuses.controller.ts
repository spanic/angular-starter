import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatusesData } from 'src/shared/models/statuses-data.model';
import { StatusesService } from './statuses.service';

@ApiTags('Devices & statuses')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  @ApiBearerAuth()
  findAll(): Promise<StatusesData> {
    return this.statusesService.findAll();
  }
}
