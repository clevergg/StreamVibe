import { Suspense } from 'react';
import type { Metadata } from 'next';
import { MovieCatalog } from '@/components/movies/MovieCatalog';

export const metadata: Metadata = {
  title: 'Фильмы и сериалы — StreamVibe',
};

export default function MoviesPage() {
  // useSearchParams в MovieCatalog требует Suspense-обёртку
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <div className="h-9 w-72 animate-pulse rounded-lg bg-black-10" />
        </div>
      }
    >
      <MovieCatalog />
    </Suspense>
  );
}
