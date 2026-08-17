'use client';

import { Menu, Play, Search, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import { useLiveStore } from '@/store/live';

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/movies', label: 'Фильмы и сериалы' },
  { href: '/support', label: 'Поддержка' },
  { href: '/subscriptions', label: 'Подписки' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const online = useLiveStore((s) => s.online);
  const connected = useLiveStore((s) => s.connected);

  return (
    <header className="sticky top-0 z-50 border-b border-black-12 bg-black-08/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="StreamVibe — на главную">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-45">
            <Play className="h-4 w-4 fill-white text-white" aria-hidden />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Stream<span className="text-red-45">Vibe</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-xl border border-black-12 bg-black-06 p-1.5 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'rounded-lg px-4 py-2 text-sm transition-colors',
                pathname === item.href
                  ? 'bg-black-10 font-semibold text-white'
                  : 'text-grey-60 hover:text-white',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="hidden items-center gap-1.5 rounded-lg border border-black-12 bg-black-06 px-3 py-2 text-xs text-grey-60 sm:flex"
            title="Пользователей на сайте (обновляется по WebSocket)"
          >
            <span
              className={clsx('h-2 w-2 rounded-full', connected ? 'bg-green-500' : 'bg-black-25')}
              aria-hidden
            />
            <Users className="h-4 w-4" aria-hidden />
            {connected ? `Онлайн: ${online}` : 'Оффлайн'}
          </span>

          <Link
            href="/movies"
            aria-label="Поиск по каталогу"
            className="rounded-lg p-2 text-grey-60 transition-colors hover:text-white"
          >
            <Search className="h-5 w-5" aria-hidden />
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-grey-60 transition-colors hover:text-white lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-black-12 bg-black-06 lg:hidden">
          <div className="container flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'rounded-lg px-4 py-3 text-sm',
                  pathname === item.href ? 'bg-black-10 font-semibold' : 'text-grey-60',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
