import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { KinopoiskService } from './kinopoisk.service';

class ImportKinopoiskDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  pages?: number = 1;

  @IsOptional()
  @IsIn(['movie', 'tv-series'])
  type?: 'movie' | 'tv-series';
}

@ApiTags('import')
@Controller('import')
export class KinopoiskController {
  constructor(private readonly kinopoisk: KinopoiskService) {}

  @Post('kinopoisk')
  @ApiOperation({
    summary: 'Импорт популярных фильмов из kinopoisk.dev',
    description:
      'Тянет по 50 фильмов на страницу (сортировка по числу оценок) и апсертит в PostgreSQL. ' +
      'Нужен KINOPOISK_API_KEY в backend/.env — бесплатно выдаёт бот t.me/kinopoiskdev_bot (200 запросов/день).',
  })
  @ApiBody({
    schema: {
      properties: {
        pages: { type: 'number', example: 2, description: 'Сколько страниц по 50 фильмов (1–10)' },
        type: { type: 'string', enum: ['movie', 'tv-series'], description: 'Не указан — и фильмы, и сериалы' },
      },
    },
    required: false,
  })
  @ApiOkResponse({ description: '{ imported: number }' })
  import(@Body() dto: ImportKinopoiskDto) {
    return this.kinopoisk.import(dto?.pages ?? 1, dto?.type);
  }
}
