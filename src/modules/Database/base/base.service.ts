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
import { UnifyResponse } from '@/modules/Core/helpers';

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

  protected async buildItemQB(
    id: string,
    qb: SelectQueryBuilder<E>,
    callback?: QueryHook<E>,
  ) {
    qb.where(`${this.repository.qbName}.id = :id`, { id });
    return callback ? callback(qb) : qb;
  }

  async detail(id: string, callback?: QueryHook<E>): Promise<E> {
    const qb = await this.buildItemQB(
      id,
      this.repository.buildBaseQuery(),
      callback,
    );
    const item = await qb.getOne();
    if (!item)
      throw new NotFoundException(
        `${this.repository.qbName} ${id} not exists!`,
      );
    return item;
  }

  async update(id: string, other: Record<string, any>) {
    try {
      await this.repository.update(id, other);
      return UnifyResponse.updateSuccess();
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
    await this.repository.remove(items);
    return '删除成功';
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
