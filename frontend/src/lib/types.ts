export type MovieType = 'MOVIE' | 'SERIES';

export interface Genre {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface Review {
  id: number;
  author: string;
  location?: string | null;
  rating: number;
  text: string;
  createdAt: string;
  movieId: number;
  movieTitle?: string;
}

export interface Movie {
  id: number;
  kinopoiskId?: number | null;
  title: string;
  originalTitle?: string | null;
  description?: string | null;
  year: number;
  type: MovieType;
  rating: number;
  votes: number;
  duration?: number | null;
  ageRating?: number | null;
  posterUrl?: string | null;
  backdropUrl?: string | null;
  country?: string | null;
  isTrending: boolean;
  isNewRelease: boolean;
  isMustWatch: boolean;
  genres: Genre[];
  reviews?: Review[];
  similar?: Movie[];
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface Collections {
  top10: Movie[];
  trending: Movie[];
  newReleases: Movie[];
  mustWatch: Movie[];
}
