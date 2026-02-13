import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SkuService } from '@/modules/Mall/services';
import { CreateSkuDto, UpdateSkuDto } from '@/modules/Mall/dtos';

@Controller('sku')
export class SkuController {
  constructor(protected service: SkuService) {}

  @Post()
  async create(@Body() createSkuDto: CreateSkuDto) {
    return await this.service.create(createSkuDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete([id]);
  }

  @Patch()
  async update(@Body() updateSkuDto: UpdateSkuDto) {
    return await this.service._update(updateSkuDto);
  }
}
