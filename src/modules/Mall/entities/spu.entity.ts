import { _BaseEntity } from '@/modules/Database/base';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { OnlineStatus } from '@/modules/Mall/constants';
import { CategoryEntity } from '@/modules/Mall/entities/category.entity';
import { SkuEntity } from '@/modules/Mall/entities/sku.entity';

@Entity('spu')
export class SpuEntity extends _BaseEntity {
  @Column({ type: 'varchar', length: 30, comment: '副标题', nullable: true })
  subtitle: string;

  @Column({ type: 'varchar', comment: '图片', nullable: true })
  img: string;

  @Column({ type: 'int', nullable: false, comment: '价格' })
  price: number;

  @Column({ type: 'int', nullable: true, comment: '折扣价' })
  discount_price: number;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: OnlineStatus,
    default: OnlineStatus.ONLINE,
  })
  online: OnlineStatus;

  @Column({
    comment: 'TAG',
    nullable: true,
  })
  tags: string;

  @ManyToOne(() => CategoryEntity, (category) => category.spus, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Relation<CategoryEntity>;

  @OneToMany(() => SkuEntity, (sku) => sku.spu)
  skus: Relation<SkuEntity>[];
}
