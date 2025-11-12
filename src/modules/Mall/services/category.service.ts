import { Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { CategoryRepository } from '@/modules/Mall/repositories';
import { CategoryEntity } from '@/modules/Mall/entities';
import { CreateCategoryDto } from '@/modules/Mall/dtos';

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CategoryRepository
> {
  constructor(protected repository: CategoryRepository) {
    super(repository);
  }

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    const item: CategoryEntity = await this.repository.save(data);
    return await this.detail(item.id);
  }
}
