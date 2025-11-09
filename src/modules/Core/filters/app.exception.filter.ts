import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost } from '@nestjs/common';

export class AppExceptionFilter<T = Error> implements BaseExceptionFilter<T> {
  catch(exception: T, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
