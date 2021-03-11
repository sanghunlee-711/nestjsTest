import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//main.ts is mandatory name

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //make validation pipe -> like midleware
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //transform 속성은 controller에서 params로 받는 인자로 지정해놓은 타입으로 param의 타입을 변경해줌
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
