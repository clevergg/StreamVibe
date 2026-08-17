import { Play, Send, Youtube } from 'lucide-react';
import Link from 'next/link';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Навигация',
    links: [
      { label: 'Главная', href: '/' },
      { label: 'Фильмы и сериалы', href: '/movies' },
      { label: 'Поддержка', href: '/support' },
      { label: 'Подписки', href: '/subscriptions' },
    ],
  },
  {
    title: 'Жанры',
    links: [
      { label: 'Боевики', href: '/movies?genre=боевик' },
      { label: 'Комедии', href: '/movies?genre=комедия' },
      { label: 'Драмы', href: '/movies?genre=драма' },
      { label: 'Фантастика', href: '/movies?genre=фантастика' },
    ],
  },
  {
    title: 'Каталог',
    links: [
      { label: 'Новинки', href: '/movies?sort=year' },
      { label: 'Популярное', href: '/movies?sort=votes' },
      { label: 'Топ рейтинга', href: '/movies?sort=rating' },
      { label: 'Сериалы', href: '/movies?type=SERIES' },
    ],
  },
  {
    title: 'Помощь',
    links: [
      { label: 'Центр поддержки', href: '/support' },
      { label: 'Тарифы', href: '/subscriptions' },
      { label: 'Вопросы и ответы', href: '/support' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black-12 bg-black-06">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2" aria-label="StreamVibe">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-45">
              <Play className="h-4 w-4 fill-white text-white" aria-hidden />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Stream<span className="text-red-45">Vibe</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-grey-60">
            Лучшие фильмы и сериалы — на любых устройствах, в любое время.
          </p>
          <div className="flex gap-3">
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="rounded-lg border border-black-15 bg-black-10 p-2.5 text-grey-60 transition-colors hover:text-white"
            >
              <Send className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="rounded-lg border border-black-15 bg-black-10 p-2.5 text-grey-60 transition-colors hover:text-white"
            >
              <Youtube className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-bold">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-grey-60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-black-12">
        <div className="container flex flex-col gap-3 py-6 text-xs text-grey-60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StreamVibe. Учебный проект-портфолио.</p>
          <p>Условия использования · Политика конфиденциальности</p>
        </div>
      </div>
    </footer>
  );
}
