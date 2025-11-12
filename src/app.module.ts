import { Module } from '@nestjs/common';
import { CoreModule } from '@/modules/Core/core.module';
import { ContentModule } from '@/modules/content/content.module';
import { DatabaseModule } from '@/modules/Database/database.module';
import { MallModule } from '@/modules/Mall/mall.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from '@/modules/Core/filters/app.exception.filter';

@Module({
  imports: [CoreModule.forRoot(), DatabaseModule, ContentModule, MallModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
