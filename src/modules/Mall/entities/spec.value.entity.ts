import { _BaseEntity } from '@/modules/Database/base';
import { Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { SpecKeyEntity } from '@/modules/Mall/entities/spec.key.entity';

@Entity('spec_value')
export class SpecValueEntity extends _BaseEntity {
  @ManyToOne(() => SpecKeyEntity, (key) => key.values, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'key_id' })
  key: Relation<SpecKeyEntity>;
}
