import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { GenresModule } from './genres/genres.module';
import { ImportModule } from './import/import.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EventsModule,
    MoviesModule,
    GenresModule,
    ReviewsModule,
    ImportModule,
  ],
})
export class AppModule {}
