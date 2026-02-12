import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { SpuService } from '@/modules/Mall/services';
import { CreateSpuDto, UpdateSpuDto } from '@/modules/Mall/dtos';

@Controller('spu')
export class SpuController {
  constructor(private readonly spuService: SpuService) {}

  @Post()
  async create(@Body() spuDto: CreateSpuDto) {
    return await this.spuService.create(spuDto);
  }

  @Patch()
  async update(@Body() spuDto: UpdateSpuDto) {
    return await this.spuService._update(spuDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.spuService.delete([id]);
  }
}
