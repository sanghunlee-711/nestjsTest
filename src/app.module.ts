import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';
import { AppService } from './app.service';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  //express의 라우터 같은 존재, url가져오고 함수를 실행
  providers: [AppService],
})
export class AppModule {}
