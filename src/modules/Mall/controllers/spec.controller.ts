import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SpecKeyService } from '@/modules/Mall/services';
import { CreateSpecKeyDto, UpdateSpecKeyDto } from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Controller('spec')
export class SpecController {
  constructor(private keyService: SpecKeyService) {}

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
}
