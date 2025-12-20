import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';

import { OnlineStatus } from '@/modules/Mall/constants';
import { _BaseEntity } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities/spu.entity';

@Entity('category')
export class CategoryEntity extends _BaseEntity {
  @Column({
    comment: '图片',
    nullable: true,
  })
  img: string;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: OnlineStatus,
    default: OnlineStatus.ONLINE,
  })
  online: OnlineStatus;

  @OneToMany(() => CategoryEntity, (cate) => cate.parent)
  children: Relation<CategoryEntity>[];

  @ManyToOne(() => CategoryEntity, (cate) => cate.children, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Relation<CategoryEntity> | null;

  @OneToMany(() => SpuEntity, (spu) => spu.category)
  spus: Relation<SpuEntity>[];
}
