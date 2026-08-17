import type { Collections, Genre, Movie, Paginated, Review } from './types';

// На сервере (SSR внутри docker-сети) приоритет у API_URL_INTERNAL (http://backend:4000/api),
// в браузере всегда используется публичный NEXT_PUBLIC_API_URL.
const API_URL =
  (typeof window === 'undefined' ? process.env.API_URL_INTERNAL : undefined) ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api';

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export interface MoviesQuery {
  type?: 'MOVIE' | 'SERIES';
  genre?: string;
  search?: string;
  sort?: 'rating' | 'year' | 'votes' | 'created';
  page?: number;
  limit?: number;
}

export const api = {
  getCollections: () => fetchJson<Collections>('/movies/collections'),

  getMovies: (query: MoviesQuery = {}) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params.set(key, String(value));
    });
    const qs = params.toString();
    return fetchJson<Paginated<Movie>>(`/movies${qs ? `?${qs}` : ''}`);
  },

  getMovie: (id: number | string) => fetchJson<Movie>(`/movies/${id}`),

  getGenres: () => fetchJson<Genre[]>('/genres'),

  createReview: (
    movieId: number,
    data: { author: string; location?: string; rating: number; text: string },
  ) =>
    fetchJson<Review>(`/movies/${movieId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
