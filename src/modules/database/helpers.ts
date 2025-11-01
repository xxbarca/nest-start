import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginateOptions, PaginateReturn } from '@/modules/database/types';
import { isNil } from 'lodash';

/**
 * 为query添加查询的回调函数接口
 */
export type QueryHook<Entity extends ObjectLiteral> = (
  hookQuery: SelectQueryBuilder<Entity>,
) => Promise<SelectQueryBuilder<Entity>>;

/**
 * 分页函数
 * @param qb queryBuilder实例
 * @param options 分页选项
 */
export const paginate = async <E extends ObjectLiteral>(
  qb: SelectQueryBuilder<E>,
  options: PaginateOptions,
): Promise<PaginateReturn<E>> => {
  const limit =
    isNil(options.pageSize) || options.pageSize < 1 ? 1 : options.pageSize;
  const page = isNil(options.pageNo) || options.pageNo < 1 ? 1 : options.pageNo;
  const start = page >= 1 ? page - 1 : 0;
  const totalItems = await qb.getCount();
  qb.take(limit).skip(start * limit);
  const items = await qb.getMany();
  const totalPages =
    totalItems % limit === 0
      ? Math.floor(totalItems / limit)
      : Math.floor(totalItems / limit) + 1;
  const remainder = totalItems % limit !== 0 ? totalItems % limit : limit;
  const itemCount = page < totalPages ? limit : remainder;
  return {
    items,
    meta: {
      total: totalItems,
      itemCount,
      pageSize: limit,
      totalPages,
      pageNum: page,
    },
  };
};
