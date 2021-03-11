//DTO: Data Transfer Object
//사람들이 보내고 주고 받을 데이터 타입을 정의해주는 곳
//npm i class-validator class-transformer
import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
