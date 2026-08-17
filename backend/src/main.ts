import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',') ?? '*',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('StreamVibe API')
    .setDescription(
      'API онлайн-кинотеатра StreamVibe: каталог фильмов и сериалов, жанры, отзывы, ' +
        'импорт из kinopoisk.dev. Realtime-события (онлайн, «сейчас смотрят», новые отзывы) — через WebSocket (socket.io) на том же порту.',
    )
    .setVersion('1.0')
    .addTag('movies', 'Каталог фильмов и сериалов')
    .addTag('genres', 'Жанры')
    .addTag('reviews', 'Отзывы')
    .addTag('import', 'Импорт фильмов из внешних источников')
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  console.log(`🎬 StreamVibe API:  http://localhost:${port}/api`);
  console.log(`📖 Swagger-доки:    http://localhost:${port}/api/docs`);
}

bootstrap();
