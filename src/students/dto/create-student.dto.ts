import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    example: 'Muhammad Ali',
    description: 'Full name of the student',
  })
  name: string;

  @ApiProperty({
    example: 'ali',
    description: 'Username of the student',
  })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the student',
  })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password for the student account',
  })
  password: string;

  // Optional fields

  @ApiProperty({
    example: 22,
    description: 'Age of the student (optional)',
    required: false,
  })
  age: number;

  @ApiProperty({
    example: '+923001234567',
    description: 'Phone number (optional)',
    required: false,
  })
  phone_number?: string;

  @ApiProperty({
    example: '123 Main Street, Karachi',
    description: 'Home address (optional)',
    required: false,
  })
  address: string;

  @ApiProperty({
    example: '2025-01-10',
    description: 'Enrollment date (ISO string or Date object, optional)',
    required: false,
    type: String, // Since Swagger does not accept union types directly
  })
  enrollment_date?: string | Date;
}
