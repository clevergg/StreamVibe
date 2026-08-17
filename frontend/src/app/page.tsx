import { api } from '@/lib/api';
import type { Collections, Genre } from '@/lib/types';
import { CtaBanner } from '@/components/home/CtaBanner';
import { DevicesSection } from '@/components/home/DevicesSection';
import { FaqSection } from '@/components/home/FaqSection';
import { GenresSection } from '@/components/home/GenresSection';
import { HomeHero } from '@/components/home/HomeHero';
import { PricingSection } from '@/components/home/PricingSection';
import { MovieRow } from '@/components/movies/MovieRow';

export default async function HomePage() {
  // Если бекенд не запущен — страница не падает, показываем подсказку
  const [collections, genres] = await Promise.all([
    api.getCollections().catch((): Collections | null => null),
    api.getGenres().catch((): Genre[] => []),
  ]);

  return (
    <>
      <HomeHero movies={collections ? [...collections.top10, ...collections.trending].slice(0, 12) : []} />

      {!collections && (
        <div className="container py-10">
          <div className="rounded-xl border border-red-45/40 bg-red-45/10 p-6 text-sm leading-relaxed">
            <p className="font-semibold">Бекенд недоступен</p>
            <p className="mt-1 text-grey-70">
              Запустите API: <code className="rounded bg-black-10 px-1.5 py-0.5">docker compose up -d</code>,
              затем в папке backend: <code className="rounded bg-black-10 px-1.5 py-0.5">bun run start:dev</code>.
              Подробности — в README.md.
            </p>
          </div>
        </div>
      )}

      {collections && (
        <>
          <MovieRow title="Топ-10 по рейтингу" movies={collections.top10} viewAllHref="/movies?sort=rating" />
          <MovieRow title="Сейчас в тренде" movies={collections.trending} viewAllHref="/movies?sort=votes" />
          <MovieRow title="Новинки" movies={collections.newReleases} viewAllHref="/movies?sort=year" />
          <MovieRow title="Стоит посмотреть" movies={collections.mustWatch} viewAllHref="/movies" />
        </>
      )}

      <GenresSection genres={genres} />
      <DevicesSection />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
