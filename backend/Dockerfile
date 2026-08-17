# ---------- Сборка ----------
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install

COPY prisma ./prisma
RUN bunx prisma generate

COPY . .
RUN bun run build

# ---------- Продакшен ----------
FROM oven/bun:1 AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000

# Миграции (или db push при их отсутствии) -> идемпотентный сид -> запуск API
CMD ["sh", "-c", "bunx prisma migrate deploy || bunx prisma db push; bun prisma/seed.ts; bun dist/main.js"]
