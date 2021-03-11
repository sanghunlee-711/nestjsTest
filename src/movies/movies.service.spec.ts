import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  //테스트 전에 실행되는게 beforeach
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // afterAll(()=>{
  //   //보통은 테스트를 위해 DB에 넣었던 모든 것을 제거하는 용도
  // })
  //Individual Test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('shold return an Array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const id = 1;
      const movie = service.getOne(id);
      expect(movie).toBeDefined;
      expect(movie.id).toEqual(id);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(99999);
      } catch (e) {
        const id = 99999;

        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie width ID:${id} not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length; //length will be 1
      service.deleteOne(1);
      const afterDelete = service.getAll().length; //length will be 0
      console.log(beforeDelete, afterDelete);

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('Should be return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('Should create a movie', () => {
      const beforeCreate = service.getAll().length; //0 expected

      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate); //1 expected
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('Should Update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      service.update(1, {
        title: 'Update Title',
        genres: ['test1', 'test2'],
        year: 3000,
      });

      const movie = service.getOne(1);

      expect(movie.year).toEqual(3000);
      expect(movie.title).toEqual('Update Title');
      expect(movie.genres).toEqual(['test1', 'test2']);
    });

    it('Should throw a NotFoundException ', () => {
      try {
        service.update(9999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
