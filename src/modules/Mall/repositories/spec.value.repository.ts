import { BaseRepository } from '@/modules/Database/base';
import { SpecValueEntity } from '@/modules/Mall/entities/spec.value.entity';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpecValueRepository extends BaseRepository<SpecValueEntity> {
  protected _qbName: string = 'spec-value';

  constructor(protected dataSource: DataSource) {
    super(SpecValueEntity, dataSource.createEntityManager());
  }
}
