import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('movies/:movieId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Отзывы к фильму' })
  @ApiParam({ name: 'movieId', type: Number })
  findByMovie(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.reviewsService.findByMovie(movieId);
  }

  @Post()
  @ApiOperation({
    summary: 'Оставить отзыв',
    description: 'После сохранения событие review:created рассылается всем клиентам по WebSocket',
  })
  @ApiParam({ name: 'movieId', type: Number })
  @ApiCreatedResponse({ description: 'Созданный отзыв' })
  create(@Param('movieId', ParseIntPipe) movieId: number, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(movieId, dto);
  }
}
