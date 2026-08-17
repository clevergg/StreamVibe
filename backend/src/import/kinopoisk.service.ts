import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MovieType } from '@prisma/client';
import { EventsGateway } from '../events/events.gateway';
import { PrismaService } from '../prisma/prisma.service';

/** Ответ kinopoisk.dev v1.4 (только используемые поля) */
interface KpMovie {
  id: number;
  name?: string;
  alternativeName?: string;
  description?: string;
  year?: number;
  type?: string; // movie | tv-series | cartoon | anime | ...
  rating?: { kp?: number; imdb?: number };
  votes?: { kp?: number };
  movieLength?: number;
  ageRating?: number;
  poster?: { url?: string; previewUrl?: string };
  backdrop?: { url?: string };
  genres?: { name: string }[];
  countries?: { name: string }[];
}

@Injectable()
export class KinopoiskService {
  private readonly logger = new Logger(KinopoiskService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly events: EventsGateway,
  ) {}

  /**
   * Импортирует популярные фильмы/сериалы из kinopoisk.dev в PostgreSQL.
   * Бесплатный ключ (200 запросов/день) выдаёт бот https://t.me/kinopoiskdev_bot
   */
  async import(pages = 1, type?: 'movie' | 'tv-series') {
    const apiKey = this.config.get<string>('KINOPOISK_API_KEY');
    if (!apiKey) {
      throw new BadRequestException(
        'KINOPOISK_API_KEY не задан в backend/.env. Бесплатный ключ: https://t.me/kinopoiskdev_bot',
      );
    }

    let imported = 0;

    for (let page = 1; page <= Math.min(pages, 10); page++) {
      const url = new URL('https://api.kinopoisk.dev/v1.4/movie');
      url.searchParams.set('page', String(page));
      url.searchParams.set('limit', '50');
      url.searchParams.set('sortField', 'votes.kp');
      url.searchParams.set('sortType', '-1');
      url.searchParams.append('notNullFields', 'poster.url');
      url.searchParams.append('notNullFields', 'name');
      url.searchParams.append('notNullFields', 'description');
      if (type) {
        url.searchParams.set('type', type);
      } else {
        url.searchParams.append('type', 'movie');
        url.searchParams.append('type', 'tv-series');
      }

      const res = await fetch(url, { headers: { 'X-API-KEY': apiKey } });
      if (!res.ok) {
        throw new BadGatewayException(
          `kinopoisk.dev ответил ${res.status}. Проверьте ключ и лимит запросов (FREE: 200/день).`,
        );
      }

      const data = (await res.json()) as { docs?: KpMovie[] };
      for (const kp of data.docs ?? []) {
        if (!kp.name || !kp.id) continue;
        await this.upsert(kp);
        imported++;
      }
    }

    this.events.emitImportDone({ imported });
    this.logger.log(`Импортировано фильмов: ${imported}`);
    return { imported };
  }

  private async upsert(kp: KpMovie) {
    const currentYear = new Date().getFullYear();
    const rating = kp.rating?.kp ?? 0;
    const votes = kp.votes?.kp ?? 0;

    const data = {
      title: kp.name!,
      originalTitle: kp.alternativeName ?? null,
      description: kp.description ?? null,
      year: kp.year ?? 0,
      type: kp.type === 'tv-series' ? MovieType.SERIES : MovieType.MOVIE,
      rating,
      votes,
      duration: kp.movieLength ?? null,
      ageRating: kp.ageRating ?? null,
      posterUrl: kp.poster?.url ?? kp.poster?.previewUrl ?? null,
      backdropUrl: kp.backdrop?.url ?? null,
      country: kp.countries?.[0]?.name ?? null,
      isNewRelease: (kp.year ?? 0) >= currentYear - 1,
      isMustWatch: rating >= 8,
      isTrending: votes >= 400_000,
      genres: {
        connectOrCreate: (kp.genres ?? []).map((g) => ({
          where: { name: g.name },
          create: { name: g.name, slug: this.slugify(g.name) },
        })),
      },
    };

    await this.prisma.movie.upsert({
      where: { kinopoiskId: kp.id },
      create: { kinopoiskId: kp.id, ...data },
      update: data,
    });
  }

  private slugify(name: string) {
    return name.toLowerCase().trim().replace(/\s+/g, '-');
  }
}
