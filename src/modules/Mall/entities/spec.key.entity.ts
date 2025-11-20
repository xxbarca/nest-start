import { _BaseEntity } from '@/modules/Database/base';
import { Column, Entity } from 'typeorm';

@Entity('spec_key')
export class SpecKeyEntity extends _BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  unit: string;
}
