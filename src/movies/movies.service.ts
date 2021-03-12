import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    //진짜 db였으면 아래에는 쿼리가 올 것임.
    return this.movies;
  }

  getOne(id: number): Movie {
    console.log(typeof id);
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie width ID:${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    //위처럼하면 자동으로 에러처리가 되는 기적 :) -> 재사용 !!
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    //이전 데이터 + 현재 데이터로 업데이트한 자료를 넣어주는 로직
    this.movies.push({ ...movie, ...updateData });
  }
}
