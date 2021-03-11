import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
//controller("EntryPoint")로 컨트롤러에 들어가는 값이 url의 Entry point가 되는 것
@Controller('movies')
export class MoviesController {
  //express처럼 import만 하는 것이 아니라 사용을 위해 constructor에서 선언해줘야함
  constructor(private readonly moviesServie: MoviesService) {}

  // getAll(@Req() req, @Res() res): Movie[] {
  //   res.json()
  //       //express처럼 req, res객체를 @Req, @Res와 같은 데코레이터를 통해 사용할 수는 있으나 직접적으로 건드리는건 지양해야함 (express랑 fastify둘다 돌아갈 수 있는 환경이기때문)
  @Get()
  getAll(): Movie[] {
    return this.moviesServie.getAll();
  }

  //   @Get('search')
  //   search(@Query('year') searchingYear: string) {
  //     //http://localhost:3000/movies/search?year=2000 -> We are searching for movie made after 2000
  //     // @Get('/:id') 뒤에 놓게 되면 search가 id인줄알고 의도대로 진행 안될 수도 있음
  //     return `We are searching for movie made after ${searchingYear}`;
  //   }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    //@Parameter로 요청을 하고 id를 arg movieId에 저장하는 거임
    console.log(typeof movieId);
    return this.moviesServie.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    //post 데코레이터를 통해 들어오는 body의 내용을 받기위해서 @Body 데코레이터를 사용
    console.log(movieData);
    return this.moviesServie.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesServie.deleteOne(movieId);
  }
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesServie.update(movieId, updateData);
  }

  //   @Put()
  //전체를 업데이트할 때 사용 @Patch()는 일부를 업데이트할 때 사용
}
