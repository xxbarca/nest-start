import { Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities';
import { CategoryRepository, SpuRepository } from '@/modules/Mall/repositories';
import { CreateSpuDto, UpdateSpuDto } from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Injectable()
export class SpuService extends BaseService<SpuEntity, SpuRepository> {
  constructor(
    protected repository: SpuRepository,
    protected categoryRepository: CategoryRepository,
  ) {
    super(repository);
  }

  async create(spuDto: CreateSpuDto) {
    const cate = await this.categoryRepository.findOne({
      where: { id: spuDto.category },
    });
    await this.repository.save({
      ...spuDto,
      category: cate,
    });
    return '创建成功';
  }

  async _update(spuDto: UpdateSpuDto) {
    const cate = await this.categoryRepository.findOne({
      where: { id: spuDto.category },
    });
    await super.update(spuDto.id, { ...omit(spuDto, ['id']), category: cate });
    return await super.detail(spuDto.id);
  }
}
