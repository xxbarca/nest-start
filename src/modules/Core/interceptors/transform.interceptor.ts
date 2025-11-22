import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

export const createApiResponse = <T>(
  data: T,
  code = 200,
  message = '请求成功',
): ApiResponse<T> => ({
  code,
  message,
  data,
  timestamp: Date.now(),
});

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    // 拦截响应流，通过 map 操作符包装数据
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return next.handle().pipe(
      map((data) => {
        // 如果控制器返回的是自定义对象（如 { code: 201, message: '创建成功' }），则合并
        if (data && typeof data === 'object' && 'code' in data) {
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          return createApiResponse(data.data ?? null, data.code, data.message);
        }
        // 否则使用默认成功格式包装
        return createApiResponse(data);
      }),
    );
  }
}
