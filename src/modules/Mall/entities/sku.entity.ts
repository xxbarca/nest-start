import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { _BaseEntity } from '@/modules/Database/base';
import { OnlineStatus } from '@/modules/Mall/constants';
import { SpuEntity } from '@/modules/Mall/entities/spu.entity';

@Entity('sku')
export class SkuEntity extends _BaseEntity {
  @Column({
    nullable: false,
    comment: '标题',
    type: 'varchar',
    length: 15,
  })
  title: string;

  @Column({ type: 'int', nullable: false, comment: '价格' })
  price: number;

  @Column({ type: 'int', nullable: true, comment: '折扣价' })
  discount_price: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '库存',
  })
  stock: number;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: OnlineStatus,
    default: OnlineStatus.ONLINE,
  })
  online: OnlineStatus;

  @ManyToOne(() => SpuEntity, (spu) => spu.skus, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'spu_id' })
  spu: Relation<SpuEntity>;
}
