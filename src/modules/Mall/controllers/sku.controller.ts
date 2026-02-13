import { Body, Controller, Post } from '@nestjs/common';
import { SkuService } from '@/modules/Mall/services';
import { CreateSkuDto } from '@/modules/Mall/dtos';

@Controller('sku')
export class SkuController {
  constructor(protected service: SkuService) {}

  @Post()
  async create(@Body() createSkuDto: CreateSkuDto) {
    return await this.service.create(createSkuDto);
  }
}
