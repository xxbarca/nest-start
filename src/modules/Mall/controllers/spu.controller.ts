import { Body, Controller, Post } from '@nestjs/common';
import { SpuService } from '@/modules/Mall/services';
import { CreateSpuDto } from '@/modules/Mall/dtos';

@Controller('spu')
export class SpuController {
  constructor(private readonly spuService: SpuService) {}

  @Post()
  async create(@Body() spuDto: CreateSpuDto) {
    return await this.spuService.create(spuDto);
  }
}
