import { ObjectLiteral } from 'typeorm';
import { IPaginationMeta, IPaginationOptions } from 'nestjs-typeorm-paginate';

/**
 * 分页验证DTO接口
 */
export interface IPaginateDto<C extends IPaginationMeta = IPaginationMeta>
  extends Omit<IPaginationOptions<C>, 'page' | 'limit'> {
  page: number;
  limit: number;
}

/**
 * 分页原数据
 */
export interface PaginateMeta {
  /**
   * 当前页项目数量
   */
  itemCount: number;
  /**
   * 项目总数量
   */
  total?: number;
  /**
   * 每页显示数量
   */
  pageSize: number;
  /**
   * 总页数
   */
  totalPages?: number;
  /**
   * 当前页数
   */
  pageNum: number;
}

/**
 * 分页选项
 */
export interface PaginateOptions {
  /**
   * 当前页数
   */
  pageNo?: number;
  /**
   * 每页显示数量
   */
  pageSize?: number;
}

/**
 * 分页返回数据
 */
export interface PaginateReturn<E extends ObjectLiteral> {
  meta: PaginateMeta;
  items: E[];
}
