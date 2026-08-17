import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventsGateway,
  ) {}

  findByMovie(movieId: number) {
    return this.prisma.review.findMany({
      where: { movieId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(movieId: number, dto: CreateReviewDto) {
    const movie = await this.prisma.movie.findUnique({ where: { id: movieId } });
    if (!movie) throw new NotFoundException(`Фильм с id=${movieId} не найден`);

    const review = await this.prisma.review.create({
      data: { ...dto, movieId },
    });

    this.events.emitReviewCreated({ ...review, movieTitle: movie.title });

    return review;
  }
}
