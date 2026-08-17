import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum MovieSort {
  RATING = 'rating',
  YEAR = 'year',
  VOTES = 'votes',
  CREATED = 'created',
}

export class QueryMoviesDto {
  @ApiPropertyOptional({ enum: MovieType, description: 'Фильм или сериал' })
  @IsOptional()
  @IsEnum(MovieType)
  type?: MovieType;

  @ApiPropertyOptional({ description: 'Slug жанра, например "фантастика"' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({ description: 'Поиск по названию (рус/ориг)' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: MovieSort, default: MovieSort.RATING, description: 'Сортировка' })
  @IsOptional()
  @IsEnum(MovieSort)
  sort: MovieSort = MovieSort.RATING;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;
}
