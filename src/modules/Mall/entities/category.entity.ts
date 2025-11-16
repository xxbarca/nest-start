import { Column, Entity } from 'typeorm';
import { OnlineStatus } from '@/modules/Mall/constants';
import { _BaseEntity } from '@/modules/Database/base';

@Entity('category')
export class CategoryEntity extends _BaseEntity {
  @Column({
    comment: '名称',
    unique: true,
  })
  name: string;

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
}
