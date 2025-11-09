import { Module } from '@nestjs/common';
import * as controllers from '@/modules/Mall/controllers';
import * as services from '@/modules/Mall/services';
import * as repositories from '@/modules/Mall/repositories';
@Module({
  controllers: Object.values(controllers),
  providers: [...Object.values(services), ...Object.values(repositories)],
})
export class MallModule {}
