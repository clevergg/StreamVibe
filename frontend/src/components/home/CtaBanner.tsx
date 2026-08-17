import { Play } from 'lucide-react';
import Link from 'next/link';

export function CtaBanner() {
  return (
    <section className="container py-14">
      <div className="relative overflow-hidden rounded-2xl border border-black-15 bg-black-10 px-8 py-12 sm:px-14">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-45/25 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Начните смотреть уже сегодня</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-grey-60">
              Тысячи фильмов и сериалов ждут вас. Первые 7 дней — бесплатно на любом тарифе.
            </p>
          </div>
          <Link
            href="/subscriptions"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-red-45 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-red-40"
          >
            <Play className="h-4 w-4 fill-white" aria-hidden />
            Попробовать бесплатно
          </Link>
        </div>
      </div>
    </section>
  );
}
