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
import { SpecKeyService, SpecValueService } from '@/modules/Mall/services';
import {
  CreateSpecKeyDto,
  CreateSpecValueDto,
  UpdateSpecKeyDto,
} from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Controller('spec')
export class SpecController {
  constructor(
    private keyService: SpecKeyService,
    private valueService: SpecValueService,
  ) {}

  @Post('key')
  async createKey(@Body() data: CreateSpecKeyDto) {
    return await this.keyService.create(data);
  }

  @Patch('/key/update')
  async updateKey(@Body() data: UpdateSpecKeyDto) {
    return await this.keyService.update(data.id, omit(data, ['id']));
  }

  @Delete('/key/:id')
  async deleteKey(@Param('id', ParseUUIDPipe) id: string) {
    await this.keyService.delete([id]);
  }

  @Get('key/list')
  async specKeyList() {
    return await this.keyService.list();
  }

  @Post('value')
  async createValue(@Body() data: CreateSpecValueDto) {
    return await this.valueService.create(data);
  }

  @Delete('value/:id')
  async deleteValue(@Param('id', ParseUUIDPipe) id: string) {
    return await this.valueService.delete([id]);
  }
}
