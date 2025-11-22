import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpecKeyEntity } from '@/modules/Mall/entities';
import { SpecKeyRepository } from '@/modules/Mall/repositories';
import { CreateSpecKeyDto } from '@/modules/Mall/dtos';
import { UnifyResponse } from '@/modules/Core/helpers';

@Injectable()
export class SpecKeyService extends BaseService<
  SpecKeyEntity,
  SpecKeyRepository
> {
  constructor(protected repository: SpecKeyRepository) {
    super(repository);
  }

  async create(data: CreateSpecKeyDto) {
    try {
      await this.repository.save(data);
      return UnifyResponse.createSuccess();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
