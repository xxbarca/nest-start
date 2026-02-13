import { BaseService } from '@/modules/Database/base';
import { SkuEntity } from '@/modules/Mall/entities';
import { SkuRepository, SpuRepository } from '@/modules/Mall/repositories';
import { Injectable } from '@nestjs/common';
import { CreateSkuDto } from '@/modules/Mall/dtos';

@Injectable()
export class SkuService extends BaseService<SkuEntity, SkuRepository> {
  constructor(
    protected repository: SkuRepository,
    protected spuRepo: SpuRepository,
  ) {
    super(repository);
  }

  async create(data: CreateSkuDto) {
    const spu = await this.spuRepo.findOne({
      where: {
        id: data.spu,
      },
    });
    await this.repository.save({
      ...data,
      spu,
    });
    return '创建成功';
  }
}
