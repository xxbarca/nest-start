import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '@/modules/Mall/services';
import { CreateCategoryDto } from '@/modules/Mall/dtos';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Post()
  public create(@Body() data: CreateCategoryDto) {
    return this.service.create(data);
  }
}
