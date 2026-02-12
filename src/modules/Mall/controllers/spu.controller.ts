import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SpuService } from '@/modules/Mall/services';
import { CreateSpuDto, PageSpuDto, UpdateSpuDto } from '@/modules/Mall/dtos';

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

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.spuService.detail(id);
  }

  @Post('/paginate')
  async paginate(@Body() data: PageSpuDto) {
    return await this.spuService.page(data);
  }
}
