import { BaseService } from '@/modules/Database/base';
import { SkuEntity, SpuEntity } from '@/modules/Mall/entities';
import { SkuRepository, SpuRepository } from '@/modules/Mall/repositories';
import { Injectable } from '@nestjs/common';
import { CreateSkuDto, UpdateSkuDto } from '@/modules/Mall/dtos';
import { omit } from 'lodash';

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

  async _update(data: UpdateSkuDto) {
    let spu: SpuEntity = null;
    if (data.spu) {
      spu = await this.spuRepo.findOne({
        where: { id: data.spu },
      });
    }

    if (spu) {
      await super.update(data.id, { ...omit(data, ['id']), spu });
    } else {
      await super.update(data.id, { ...omit(data, ['id']) });
    }
    return '更新成功';
  }
}
