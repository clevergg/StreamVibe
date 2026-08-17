import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-7xl font-extrabold text-red-45">404</p>
      <h1 className="mt-4 text-2xl font-bold">Страница не найдена</h1>
      <p className="mt-2 max-w-md text-sm text-grey-60">
        Похоже, такого фильма или страницы у нас нет. Загляните в каталог — там точно найдётся что посмотреть.
      </p>
      <Link
        href="/movies"
        className="mt-8 rounded-lg bg-red-45 px-6 py-3 text-sm font-semibold transition-colors hover:bg-red-40"
      >
        Перейти в каталог
      </Link>
    </div>
  );
}
