import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Genre } from '@/lib/types';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function GenresSection({ genres }: { genres: Genre[] }) {
  if (!genres.length) return null;

  return (
    <section className="container py-10">
      <SectionTitle
        title="Исследуйте разнообразие жанров"
        subtitle="Что бы вы ни искали — у нас найдётся фильм под любое настроение: от лёгких комедий до напряжённых триллеров."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/movies?genre=${encodeURIComponent(genre.slug)}`}
            className="group rounded-xl border border-black-15 bg-black-10 p-4 transition-colors hover:border-black-25"
          >
            <p className="text-sm font-semibold capitalize">{genre.name}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-grey-60">
              <span>{genre.count ?? 0} тайтлов</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
