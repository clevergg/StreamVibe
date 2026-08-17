import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MovieSort, QueryMoviesDto } from './dto/query-movies.dto';

const orderByMap: Record<MovieSort, Prisma.MovieOrderByWithRelationInput> = {
  [MovieSort.RATING]: { rating: 'desc' },
  [MovieSort.YEAR]: { year: 'desc' },
  [MovieSort.VOTES]: { votes: 'desc' },
  [MovieSort.CREATED]: { createdAt: 'desc' },
};

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryMoviesDto) {
    const where: Prisma.MovieWhereInput = {};

    if (query.type) where.type = query.type;
    if (query.genre) where.genres = { some: { slug: query.genre } };
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { originalTitle: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await this.prisma.$transaction([
      this.prisma.movie.count({ where }),
      this.prisma.movie.findMany({
        where,
        include: { genres: true },
        orderBy: orderByMap[query.sort],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
    ]);

    return {
      items,
      total,
      page: query.page,
      pages: Math.max(1, Math.ceil(total / query.limit)),
    };
  }

  async collections() {
    const include = { genres: true } as const;
    const [top10, trending, newReleases, mustWatch] = await this.prisma.$transaction([
      this.prisma.movie.findMany({ include, orderBy: { rating: 'desc' }, take: 10 }),
      this.prisma.movie.findMany({ where: { isTrending: true }, include, orderBy: { votes: 'desc' }, take: 12 }),
      this.prisma.movie.findMany({ where: { isNewRelease: true }, include, orderBy: { year: 'desc' }, take: 12 }),
      this.prisma.movie.findMany({ where: { isMustWatch: true }, include, orderBy: { rating: 'desc' }, take: 12 }),
    ]);
    return { top10, trending, newReleases, mustWatch };
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: true,
        reviews: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!movie) throw new NotFoundException(`Фильм с id=${id} не найден`);

    const genreIds = movie.genres.map((g) => g.id);
    const similar = genreIds.length
      ? await this.prisma.movie.findMany({
          where: { id: { not: id }, genres: { some: { id: { in: genreIds } } } },
          include: { genres: true },
          orderBy: { rating: 'desc' },
          take: 8,
        })
      : [];

    return { ...movie, similar };
  }
}
