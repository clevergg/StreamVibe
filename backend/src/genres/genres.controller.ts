import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Все жанры с количеством фильмов' })
  @ApiOkResponse({ description: '[{ id, name, slug, count }]' })
  async findAll() {
    const genres = await this.prisma.genre.findMany({
      include: { _count: { select: { movies: true } } },
      orderBy: { name: 'asc' },
    });
    return genres.map(({ _count, ...g }) => ({ ...g, count: _count.movies }));
  }
}
