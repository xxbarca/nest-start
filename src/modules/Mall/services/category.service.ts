import { Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { CategoryRepository } from '@/modules/Mall/repositories';
import { CategoryEntity } from '@/modules/Mall/entities';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/Mall/dtos';
import { omit } from 'lodash';
import { OnlineStatus } from '@/modules/Mall/constants';

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

  async _update(data: UpdateCategoryDto): Promise<CategoryEntity> {
    await super.update(data.id, omit(data, ['id']));
    return await super.detail(data.id);
  }

  async all() {
    return await super.list();
  }

  async switchStatus(id: string) {
    const category = await this.repository.findOne({
      where: { id },
    });
    const status =
      category.online === OnlineStatus.ONLINE
        ? OnlineStatus.OFFLINE
        : OnlineStatus.ONLINE;
    await super.update(id, { online: status });
    return '更新状态成功';
  }
}
