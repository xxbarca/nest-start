import { Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities';
import { CategoryRepository, SpuRepository } from '@/modules/Mall/repositories';
import { CreateSpuDto } from '@/modules/Mall/dtos';

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
}
