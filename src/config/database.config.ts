import { resolve } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const database = (): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: resolve(__dirname, '../../database4.db'),
  synchronize: true,
  autoLoadEntities: true,
});
