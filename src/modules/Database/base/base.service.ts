import { In, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from '@/modules/Database/base/base.repository';
import {
  paginate,
  QueryHook,
  ServiceListQueryOption,
} from '@/modules/Database/helpers';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

import { PaginateOptions, PaginateReturn } from '@/modules/Database/types';
import { omit, omitBy } from 'lodash';

export class BaseService<
  E extends ObjectLiteral,
  R extends BaseRepository<E>,
  P extends ServiceListQueryOption = ServiceListQueryOption,
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
   * @param qb
   * @param options 分页选项
   * @param callback 回调查询
   */
  protected async buildListQB(
    qb: SelectQueryBuilder<E>,
    options?: P,
    callback?: QueryHook<E>,
  ) {
    options = omitBy(
      options,
      (value) =>
        value === null ||
        value === undefined ||
        value === '' ||
        Number.isNaN(value),
    ) as P;
    const wheres = Object.fromEntries(
      Object.entries(options || {}).map(([key, value]) => [key, value]),
    );
    qb = qb.where(wheres);
    return callback ? callback(qb) : qb;
  }

  async page(
    options?: PaginateOptions,
    callback?: QueryHook<E>,
  ): Promise<PaginateReturn<E>> {
    const o = omit(options, ['pageNo', 'pageSize']);
    const queryOptions = (o ?? {}) as P;
    const qb = await this.buildListQB(
      this.repository.buildBaseQuery(),
      queryOptions,
      callback,
    );
    return paginate(qb, options);
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

  async update(id: string, other: Record<string, any>) {
    try {
      return await this.repository.update(id, other);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async list(options?: P, callback?: QueryHook<E>) {
    const qb = await this.buildListQB(
      this.repository.buildBaseQuery(),
      options,
      callback,
    );
    return qb.getMany();
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
