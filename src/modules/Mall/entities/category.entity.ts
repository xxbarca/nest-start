import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OnlineStatus } from '@/modules/Mall/constants';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
