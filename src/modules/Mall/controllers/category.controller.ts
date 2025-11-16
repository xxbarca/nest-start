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
import { CategoryService } from '@/modules/Mall/services';
import {
  CreateCategoryDto,
  PaginateCategoryDto,
  UpdateCategoryDto,
} from '@/modules/Mall/dtos';

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

  @Patch()
  async update(@Body() data: UpdateCategoryDto) {
    return await this.service._update(data);
  }

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.detail(id);
  }

  @Post('/paginate')
  async paginate(@Body() data: PaginateCategoryDto) {
    return await this.service.page(data);
  }

  @Get('/all/list')
  async list() {
    return await this.service.all();
  }

  @Patch('/switchStatus/:id')
  async switchStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.switchStatus(id);
  }
}
