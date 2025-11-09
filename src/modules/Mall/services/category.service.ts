import { Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { CategoryRepository } from '@/modules/Mall/repositories';
import { CategoryEntity } from '@/modules/Mall/entities';

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CategoryRepository
> {
  constructor(protected repository: CategoryRepository) {
    super(repository);
  }
}
