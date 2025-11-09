import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppValidationPipe } from '@/modules/Core/pipes/app.validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  app.enableCors();
  // 全局验证管道
  app.useGlobalPipes(
    new AppValidationPipe({
      whitelist: true, // 自动过滤掉没有装饰器的属性
      forbidNonWhitelisted: true, // 抛出错误如果有非白名单属性
      transform: true, // 自动类型转换
      transformOptions: {
        enableImplicitConversion: true, // 启用隐式转换
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
