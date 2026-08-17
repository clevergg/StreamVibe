# StreamVibe — онлайн-кинотеатр

Full-stack приложение по дизайн-макету **StreamVibe** на русском языке.

| Часть | Стек |
|---|---|
| **Frontend** | Next.js 15 (App Router) · TailwindCSS · Zustand · WebSocket (socket.io-client) |
| **Backend** | NestJS · Prisma ORM · PostgreSQL · Swagger · socket.io · Bun |
| **Инфраструктура** | Docker (PostgreSQL 16) |

## Быстрый старт (вариант 1: всё в Docker)

```bash
docker compose up -d --build
```

Миграции и сид выполняются автоматически при старте контейнера API.
Сайт — http://localhost:3000, API — http://localhost:4000/api, Swagger — http://localhost:4000/api/docs.

## Быстрый старт (вариант 2: dev-режим)

Нужны: [Bun](https://bun.sh), [Docker](https://docker.com), Node.js 18+.

```bash
# 1. База данных (наружу проброшен порт 5434 — 5432/5433 на машине заняты)
docker compose up -d postgres

# 2. Бекенд (в папке backend)
cd backend
bun install
bunx prisma migrate dev --name init   # создаёт таблицы
bun run db:seed                       # ~30 фильмов, жанры, отзывы
bun run start:dev                     # http://localhost:4000

# 3. Фронтенд (в папке frontend, отдельный терминал)
cd frontend
bun install
bun run dev                           # http://localhost:3000
```

- Сайт: **http://localhost:3000**
- API: **http://localhost:4000/api**
- Swagger-документация: **http://localhost:4000/api/docs**

## База фильмов

Из коробки работает на **сид-данных** (~30 известных фильмов и сериалов, постеры —
стильные градиентные плейсхолдеры).

Для реальных данных и постеров подключён бесплатный источник — **[kinopoisk.dev](https://kinopoisk.dev)**
(неофициальный API Кинопоиска, русские описания, работает без VPN):

1. Получите бесплатный ключ у бота [@kinopoiskdev_bot](https://t.me/kinopoiskdev_bot) (тариф FREE — 200 запросов/день).
2. Впишите его в `backend/.env` → `KINOPOISK_API_KEY=...`
3. Перезапустите бекенд и вызовите импорт (или нажмите Try it out в Swagger):

```bash
curl -X POST http://localhost:4000/api/import/kinopoisk \
  -H "Content-Type: application/json" \
  -d "{\"pages\": 4}"
```

Каждая страница = 50 фильмов с постерами, апсертятся по kinopoiskId (можно запускать повторно).

Альтернатива — [TMDB](https://www.themoviedb.org/documentation/api) (тоже бесплатно и с русской
локализацией), но в РФ доступен только с VPN, поэтому основным выбран kinopoisk.dev.

## REST API

| Метод | Путь | Описание |
|---|---|---|
| GET | `/api/movies` | Каталог: `type`, `genre`, `search`, `sort`, `page`, `limit` |
| GET | `/api/movies/collections` | Подборки главной: топ-10, тренды, новинки, must-watch |
| GET | `/api/movies/:id` | Фильм + жанры + отзывы + похожие |
| GET | `/api/genres` | Жанры с количеством фильмов |
| GET/POST | `/api/movies/:id/reviews` | Отзывы к фильму |
| POST | `/api/import/kinopoisk` | Импорт из kinopoisk.dev (нужен ключ) |

## WebSocket (socket.io, порт 4000)

| Событие | Направление | Что делает |
|---|---|---|
| `online:count` | сервер → все | Живой счётчик посетителей (виден в шапке) |
| `watch:join` / `watch:leave` | клиент → сервер | Вход/выход из «комнаты» фильма |
| `watch:count` | сервер → комната | «Сейчас смотрят: N» на странице фильма |
| `review:created` | сервер → все | Новый отзыв — всплывающее уведомление во всех вкладках |

Проверить легко: откройте сайт в двух окнах — счётчик онлайна вырастет,
а отзыв из одного окна мгновенно всплывёт во втором.

## Структура

```
StreamVibe/
├── docker-compose.yml        # PostgreSQL 16 + backend + frontend
├── backend/
│   ├── Dockerfile            # многостадийная сборка на Bun
│   ├── prisma/schema.prisma  # Movie, Genre, Review
│   ├── prisma/seed.ts        # стартовые данные
│   └── src/
│       ├── movies/           # каталог, подборки, карточка
│       ├── genres/           # жанры
│       ├── reviews/          # отзывы (+ WebSocket-рассылка)
│       ├── import/           # импорт из kinopoisk.dev
│       └── events/           # socket.io-шлюз
└── frontend/
    ├── Dockerfile            # standalone-вывод Next.js
    └── src/
        ├── app/              # страницы: главная, каталог, фильм, поддержка, подписки
        ├── components/       # секции макета StreamVibe
        ├── store/            # Zustand: избранное (persist), live (WebSocket)
        └── lib/              # типизированный API-клиент
```

## Zustand-сторы

- `store/favorites.ts` — избранное с сохранением в localStorage (persist middleware);
- `store/live.ts` — WebSocket-состояние: онлайн, «сейчас смотрят», последний отзыв.
