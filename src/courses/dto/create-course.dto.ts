import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Title of the course',
    example: 'Introduction to Programming',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the course',
    example: 'This course covers the basics of Python programming.',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Number of credits for the course',
    example: 3,
    default: 3,
  })
  credits: number;

  @ApiProperty({
    description: 'Price of the course',
    example: 199.99,
  })
  price: number;

  @ApiProperty({
    description: 'Currency for the price',
    example: 'USD',
  })
  currency: string;
}
