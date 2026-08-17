import { Play } from 'lucide-react';
import Link from 'next/link';
import type { Movie } from '@/lib/types';
import { PosterImage } from '@/components/movies/PosterImage';

export function HomeHero({ movies }: { movies: Movie[] }) {
  const collage = [...new Map(movies.map((m) => [m.id, m])).values()].slice(0, 12);

  return (
    <section className="relative overflow-hidden border-b border-black-12">
      <div className="absolute inset-0 grid grid-cols-4 gap-2 p-2 opacity-40 sm:grid-cols-6">
        {collage.map((movie) => (
          <div key={movie.id} className="aspect-[2/3] overflow-hidden rounded-lg">
            <PosterImage title={movie.title} src={movie.posterUrl} showTitle={false} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black-08 via-black-08/70 to-black-08/40" aria-hidden />

      <div className="container relative flex min-h-[70vh] flex-col items-center justify-end pb-16 pt-24 text-center">
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
          Лучшие фильмы, сериалы и новинки — в одном месте
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-grey-60 sm:text-base">
          StreamVibe — это тысячи часов кино на любой вкус: от голливудских блокбастеров
          и культовой классики до свежих сериалов. Смотрите на любых устройствах без ограничений.
        </p>
        <Link
          href="/movies"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-red-45 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-red-40"
        >
          <Play className="h-4 w-4 fill-white" aria-hidden />
          Начать смотреть
        </Link>
      </div>
    </section>
  );
}
