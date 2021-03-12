import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

// e2e test는 application 의 모든것을 테스트 해버리는 방식
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    //실제 app 과 동일한 환경을 만들기 위해 아래와 같이 설정 제공해주기
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });
  //beforeEach 적용 시 매 테스트가 진행될 때 마다 앱이 새로 생겨서 DB가 빈 배열로 테스트가 계쏙 진행되니까
  // create 시 만든 내용을 유지하기 위해서 beforeEach -> beforeAll로 변경하자.

  it('/ (GET)', () => {
    //api request
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello Nest!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'testest', year: 2020, genres: ['test1', 'test2'] })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'testest',
          year: 2020,
          genres: ['test1', 'test2'],
          fortest: 'HELLEOE',
        })
        .expect(400);
    });

    it('DELETE', () => {
      //method not allowed -> 404
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    //main.ts의 transfrom 설정을 통해서 타입이 서버랑 테스트일때 다르게 됨.

    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'New Update test' })
        .expect(200);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
