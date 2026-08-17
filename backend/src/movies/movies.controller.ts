import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Каталог с фильтрами, поиском, сортировкой и пагинацией' })
  @ApiOkResponse({ description: '{ items, total, page, pages }' })
  findAll(@Query() query: QueryMoviesDto) {
    return this.moviesService.findAll(query);
  }

  @Get('collections')
  @ApiOperation({ summary: 'Подборки для главной: топ-10, в тренде, новинки, must-watch' })
  collections() {
    return this.moviesService.collections();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Карточка фильма: жанры, отзывы и похожие' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }
}
