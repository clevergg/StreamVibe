'use client';

import { Eye, Heart, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { Movie } from '@/lib/types';
import { useFavoritesStore } from '@/store/favorites';
import { useLiveStore } from '@/store/live';
import { PosterImage } from '@/components/movies/PosterImage';


export function MovieHero({ movie }: { movie: Movie }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const joinMovie = useLiveStore((s) => s.joinMovie);
  const leaveMovie = useLiveStore((s) => s.leaveMovie);
  const connected = useLiveStore((s) => s.connected);
  const watching = useLiveStore((s) => s.watching);

  const isFavorite = useFavoritesStore((s) => s.ids.includes(movie.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  useEffect(() => {
    joinMovie(movie.id);
    return () => leaveMovie(movie.id);
  }, [movie.id, joinMovie, leaveMovie, connected]);

  return (
    <section className="relative overflow-hidden border-b border-black-12">
      <div className="absolute inset-0">
        <PosterImage
          title={movie.title}
          src={movie.backdropUrl ?? movie.posterUrl}
          showTitle={false}
          className="scale-110 blur-sm brightness-[0.35]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black-08 via-transparent to-black-08/60" aria-hidden />

      <div className="container relative flex min-h-[60vh] flex-col items-center justify-end gap-4 pb-12 pt-24 text-center">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">{movie.title}</h1>
        {movie.originalTitle && <p className="text-sm text-grey-60">{movie.originalTitle}</p>}
        {movie.description && (
          <p className="max-w-2xl text-sm leading-relaxed text-grey-70">{movie.description}</p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-red-45 px-6 py-3 text-sm font-semibold transition-colors hover:bg-red-40"
          >
            <Play className="h-4 w-4 fill-white" aria-hidden />
            Смотреть
          </button>

          <button
            type="button"
            onClick={() => toggle(movie.id)}
            aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
            className="rounded-lg border border-black-15 bg-black-10/80 p-3 backdrop-blur transition-colors hover:bg-black-12"
          >
            <Heart
              className={clsx('h-4 w-4', mounted && isFavorite ? 'fill-red-45 text-red-45' : 'text-white')}
              aria-hidden
            />
          </button>

          <span
            className="inline-flex items-center gap-2 rounded-lg border border-black-15 bg-black-10/80 px-4 py-3 text-sm text-grey-70 backdrop-blur"
            title="Сколько человек сейчас на этой странице (WebSocket)"
          >
            <Eye className="h-4 w-4 text-red-45" aria-hidden />
            Сейчас смотрят: {connected ? Math.max(watching, 1) : '—'}
          </span>
        </div>
      </div>
    </section>
  );
}
