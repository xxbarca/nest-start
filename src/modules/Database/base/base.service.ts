import { In, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from '@/modules/Database/base/base.repository';
import { QueryHook } from '@/modules/Database/helpers';
import { NotFoundException } from '@nestjs/common';
import {
  Pagination,
  paginate as _paginate,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';
import { IPaginateDto } from '@/modules/Database/types';

export class BaseService<
  E extends ObjectLiteral,
  R extends BaseRepository<E>,
  M extends IPaginationMeta = IPaginationMeta,
> {
  /**
   * 服务默认存储类
   */
  protected repository: R;

  constructor(repository: R) {
    this.repository = repository;
    if (!(this.repository instanceof BaseRepository)) {
      throw new Error(
        'Repository must instance of BaseRepository in DataService!',
      );
    }
  }

  /**
   * 获取分页数据
   * @param options 分页选项
   * @param callback 回调查询
   */
  async paginate(
    options: IPaginateDto<M>,
    callback?: QueryHook<E>,
  ): Promise<Pagination<E, M>> {
    const qb = await this.buildListQuery(
      this.repository.buildBaseQuery(),
      callback,
    );
    return _paginate(qb, options);
  }

  async detail(id: string, callback?: QueryHook<E>): Promise<E> {
    let qb = await this.buildItemQuery(
      this.repository.buildBaseQuery(),
      callback,
    );
    qb.where(`${this.repository.qbName}.id = :id`, { id });
    if (callback) qb = await callback(qb);
    const item = await qb.getOne();
    if (!item)
      throw new NotFoundException(
        `${this.repository.qbName} ${id} not exists!`,
      );
    return item;
  }

  /**
   * 批量删除数据
   * @param data 需要删除的id列表
   */
  async delete(data: string[]) {
    const items: E[] = await this.repository.find({
      where: { id: In(data) } as any,
    });
    return this.repository.remove(items);
  }

  protected async buildItemQuery(
    qb: SelectQueryBuilder<E>,
    callback?: QueryHook<E>,
  ) {
    if (callback) {
      return callback(qb);
    }
    return qb;
  }

  protected async buildListQuery(
    qb: SelectQueryBuilder<E>,
    callback?: QueryHook<E>,
  ) {
    if (callback) return callback(qb);
    return qb;
  }
}
