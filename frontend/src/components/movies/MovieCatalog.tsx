'use client';

import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { api, type MoviesQuery } from '@/lib/api';
import type { Genre, Movie, Paginated } from '@/lib/types';
import { MovieCard } from './MovieCard';

const TABS = [
  { label: 'Все', value: undefined },
  { label: 'Фильмы', value: 'MOVIE' },
  { label: 'Сериалы', value: 'SERIES' },
] as const;

const SORTS = [
  { label: 'По рейтингу', value: 'rating' },
  { label: 'По году', value: 'year' },
  { label: 'По популярности', value: 'votes' },
] as const;

export function MovieCatalog() {
  const params = useSearchParams();

  const [type, setType] = useState<MoviesQuery['type']>(
    params.get('type') === 'SERIES' ? 'SERIES' : params.get('type') === 'MOVIE' ? 'MOVIE' : undefined,
  );
  const [genre, setGenre] = useState(params.get('genre') ?? '');
  const [search, setSearch] = useState(params.get('search') ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sort, setSort] = useState<NonNullable<MoviesQuery['sort']>>(
    (params.get('sort') as MoviesQuery['sort']) ?? 'rating',
  );
  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [data, setData] = useState<Paginated<Movie> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    api.getGenres().then(setGenres).catch(() => setGenres([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .getMovies({ type, genre: genre || undefined, search: debouncedSearch || undefined, sort, page, limit: 18 })
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch(() => {
        if (!cancelled) setError('Не удалось загрузить каталог. Проверьте, запущен ли бекенд (README.md).');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [type, genre, debouncedSearch, sort, page]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Фильмы и сериалы</h1>
      <p className="mt-2 text-sm text-grey-60">
        Полный каталог StreamVibe: ищите по названию, фильтруйте по жанрам и сортируйте как удобно.
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-fit rounded-xl border border-black-12 bg-black-06 p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => {
                setType(tab.value as MoviesQuery['type']);
                setPage(1);
              }}
              className={clsx(
                'rounded-lg px-4 py-2 text-sm transition-colors',
                type === tab.value ? 'bg-black-10 font-semibold text-white' : 'text-grey-60 hover:text-white',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row lg:justify-end">
          <label className="relative flex-1 lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-60" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию…"
              className="w-full rounded-lg border border-black-15 bg-black-10 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-grey-60 focus:border-red-45"
            />
          </label>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as NonNullable<MoviesQuery['sort']>);
              setPage(1);
            }}
            aria-label="Сортировка"
            className="rounded-lg border border-black-15 bg-black-10 px-4 py-2.5 text-sm outline-none focus:border-red-45"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {genres.length > 0 && (
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => {
              setGenre('');
              setPage(1);
            }}
            className={clsx(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm capitalize transition-colors',
              !genre ? 'border-red-45 bg-red-45/15 text-white' : 'border-black-15 bg-black-10 text-grey-60 hover:text-white',
            )}
          >
            Все жанры
          </button>
          {genres.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                setGenre(genre === g.slug ? '' : g.slug);
                setPage(1);
              }}
              className={clsx(
                'shrink-0 rounded-full border px-4 py-1.5 text-sm capitalize transition-colors',
                genre === g.slug
                  ? 'border-red-45 bg-red-45/15 text-white'
                  : 'border-black-15 bg-black-10 text-grey-60 hover:text-white',
              )}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-10 rounded-xl border border-red-45/40 bg-red-45/10 p-6 text-sm">{error}</div>
      )}

      {loading && !data && (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-black-10" />
          ))}
        </div>
      )}

      {data && (
        <>
          <p className="mt-6 text-xs text-grey-60">Найдено: {data.total}</p>
          {data.items.length === 0 ? (
            <p className="mt-10 text-center text-grey-60">Ничего не найдено. Попробуйте изменить фильтры.</p>
          ) : (
            <div className={clsx('mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6', loading && 'opacity-60')}>
              {data.items.map((movie) => (
                <div key={movie.id} className="[&>a]:w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}

          {data.pages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-1 rounded-lg border border-black-15 bg-black-10 px-4 py-2 text-sm transition-colors hover:bg-black-12 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden /> Назад
              </button>
              <span className="text-sm text-grey-60">
                Страница {data.page} из {data.pages}
              </span>
              <button
                type="button"
                disabled={page >= data.pages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1 rounded-lg border border-black-15 bg-black-10 px-4 py-2 text-sm transition-colors hover:bg-black-12 disabled:opacity-40"
              >
                Вперёд <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
