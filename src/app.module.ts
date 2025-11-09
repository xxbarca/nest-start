import { Module } from '@nestjs/common';
import { CoreModule } from '@/modules/Core/core.module';
import { ContentModule } from '@/modules/content/content.module';
import { DatabaseModule } from '@/modules/Database/database.module';
import { MallModule } from '@/modules/Mall/mall.module';

@Module({
  imports: [CoreModule.forRoot(), DatabaseModule, ContentModule, MallModule],
})
export class AppModule {}
