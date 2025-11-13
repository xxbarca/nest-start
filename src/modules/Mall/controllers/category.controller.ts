import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from '@/modules/Mall/services';
import { CreateCategoryDto } from '@/modules/Mall/dtos';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Post()
  public create(@Body() data: CreateCategoryDto) {
    return this.service.create(data);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete([id]);
  }
}
