import { _BaseEntity } from '@/modules/Database/base';
import { Column, Entity, OneToMany } from 'typeorm';
import { SpecValueEntity } from '@/modules/Mall/entities/spec.value.entity';
import type { Relation } from 'typeorm';

@Entity('spec_key')
export class SpecKeyEntity extends _BaseEntity {
  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  unit: string;

  @OneToMany(() => SpecValueEntity, (value) => value.key)
  values: Relation<SpecValueEntity>[];
}
