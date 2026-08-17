import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'Артём', description: 'Имя автора' })
  @IsString()
  @Length(2, 60)
  author: string;

  @ApiPropertyOptional({ example: 'Москва, Россия', description: 'Город/страна' })
  @IsOptional()
  @IsString()
  @Length(2, 80)
  location?: string;

  @ApiProperty({ example: 9, minimum: 1, maximum: 10, description: 'Оценка от 1 до 10' })
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @ApiProperty({ example: 'Отличный фильм, пересматривал дважды!', description: 'Текст отзыва' })
  @IsString()
  @Length(3, 2000)
  text: string;
}
