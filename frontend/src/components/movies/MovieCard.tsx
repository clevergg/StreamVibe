'use client';

import { Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { Movie } from '@/lib/types';
import { useFavoritesStore } from '@/store/favorites';
import { PosterImage } from './PosterImage';

export function MovieCard({ movie }: { movie: Movie }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isFavorite = useFavoritesStore((s) => s.ids.includes(movie.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block w-40 shrink-0 sm:w-48"
      title={movie.title}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-black-15 bg-black-10 transition-transform duration-300 group-hover:scale-[1.03]">
        <PosterImage title={movie.title} src={movie.posterUrl} />

        {movie.rating > 0 && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black-06/80 px-2 py-1 text-xs font-semibold backdrop-blur">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden />
            {movie.rating.toFixed(1)}
          </span>
        )}

        <button
          type="button"
          aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
          onClick={(e) => {
            e.preventDefault();
            toggle(movie.id);
          }}
          className="absolute right-2 top-2 rounded-full bg-black-06/80 p-2 backdrop-blur transition-colors hover:bg-black-06"
        >
          <Heart
            className={clsx(
              'h-4 w-4 transition-colors',
              mounted && isFavorite ? 'fill-red-45 text-red-45' : 'text-white',
            )}
            aria-hidden
          />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="truncate text-sm font-semibold">{movie.title}</h3>
        <p className="text-xs text-grey-60">
          {movie.year} · {movie.type === 'SERIES' ? 'Сериал' : 'Фильм'}
        </p>
      </div>
    </Link>
  );
}
