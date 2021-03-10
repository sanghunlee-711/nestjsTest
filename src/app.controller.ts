import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //express의 get router와 같은 역할 -> url을 받아 내부의 해당 url(@GET('sth'))의  해당함수 실행 해줌
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //아래와 같이 string을 리턴해도 브라우저에 문제가 없으나 appService에 접근해서 비즈니스 로직을 들고 오는 이유는
  // Nestjs가 비즈니스 로직과 컨트롤러(url 가져오는 지금 이곳)를 구분하는 구조를 지향하기 때문
  @Get('/hello')
  sayHello(): string {
    //위와 같이 servie의 이름과 컨트롤러의 함수이름을 다르게 해도 되나 컨벤션은 같게하는거임
    return this.appService.getHi();
  }

  @Post('/hello2')
  sayHello2(): string {
    return 'Hello Every one';
  }
}
