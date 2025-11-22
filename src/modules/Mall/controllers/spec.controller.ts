import { Body, Controller, Post } from '@nestjs/common';
import { SpecKeyService } from '@/modules/Mall/services';
import { CreateSpecKeyDto } from '@/modules/Mall/dtos';

@Controller('spec')
export class SpecController {
  constructor(private keyService: SpecKeyService) {}

  @Post('key')
  async createKey(@Body() data: CreateSpecKeyDto) {
    return await this.keyService.create(data);
  }
}
