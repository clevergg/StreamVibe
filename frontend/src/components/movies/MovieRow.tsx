'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import type { Movie } from '@/lib/types';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  viewAllHref?: string;
}

export function MovieRow({ title, movies, viewAllHref }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!movies.length) return null;

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 640, behavior: 'smooth' });
  };

  return (
    <section className="container py-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link href={viewAllHref} className="text-sm text-grey-60 transition-colors hover:text-white">
              Смотреть все
            </Link>
          )}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Назад"
              className="rounded-lg border border-black-15 bg-black-10 p-2 transition-colors hover:bg-black-12"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Вперёд"
              className="rounded-lg border border-black-15 bg-black-10 p-2 transition-colors hover:bg-black-12"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
