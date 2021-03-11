//DTO: Data Transfer Object
//사람들이 보내고 주고 받을 데이터 타입을 정의해주는 곳
//npm install @nestjs/mapped-types -> dto transfer를 도와주는 npm
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
