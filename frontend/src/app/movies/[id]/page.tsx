import { Calendar, Clock, Globe, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import type { Movie } from '@/lib/types';
import { MovieHero } from '@/components/movie/MovieHero';
import { ReviewsSection } from '@/components/movie/ReviewsSection';
import { MovieRow } from '@/components/movies/MovieRow';

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let movie: Movie;
  try {
    movie = await api.getMovie(id);
  } catch {
    notFound();
  }

  const meta = [
    { icon: Calendar, label: 'Год', value: String(movie.year) },
    { icon: Clock, label: 'Длительность', value: movie.duration ? `${movie.duration} мин.` : '—' },
    { icon: Star, label: 'Рейтинг', value: `${movie.rating.toFixed(1)} / 10` },
    { icon: Users, label: 'Оценок', value: movie.votes.toLocaleString('ru-RU') },
    { icon: Globe, label: 'Страна', value: movie.country ?? '—' },
  ];

  return (
    <>
      <MovieHero movie={movie} />

      <section className="container grid gap-6 py-10 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-xl border border-black-15 bg-black-10 p-6">
          <h2 className="text-sm font-bold text-grey-60">Описание</h2>
          <p className="mt-3 leading-relaxed text-grey-75">
            {movie.description ?? 'Описание появится позже.'}
          </p>

          <h2 className="mt-6 text-sm font-bold text-grey-60">Жанры</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/movies?genre=${encodeURIComponent(genre.slug)}`}
                className="rounded-full border border-black-15 bg-black-06 px-4 py-1.5 text-sm capitalize text-grey-70 transition-colors hover:text-white"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid h-fit grid-cols-2 gap-4 rounded-xl border border-black-15 bg-black-10 p-6 sm:grid-cols-3 lg:grid-cols-2">
          {meta.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <p className="flex items-center gap-1.5 text-xs text-grey-60">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold">{value}</p>
            </div>
          ))}
          {movie.ageRating != null && (
            <div>
              <p className="text-xs text-grey-60">Возраст</p>
              <p className="mt-1 text-sm font-semibold">{movie.ageRating}+</p>
            </div>
          )}
        </div>
      </section>

      <ReviewsSection movieId={movie.id} initialReviews={movie.reviews ?? []} />

      {movie.similar && movie.similar.length > 0 && (
        <MovieRow title="Похожие" movies={movie.similar} />
      )}
    </>
  );
}
