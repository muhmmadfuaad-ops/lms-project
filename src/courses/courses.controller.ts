import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnershipGuard } from '../auth/ownership.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Student } from '../students/interfaces/student.interface';

@Controller('courses')
export class CoursesController {

  constructor(private coursesService: CoursesService) {}
  @Get()
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiBearerAuth()
  async findAllCourses(@Req() req: any): Promise<Student[]> {
    console.log('JWT payload:', req.user);                  // decoded token
    console.log('Raw token:', req.headers.authorization);   // Bearer <token>

    return this.coursesService.findAllCourses();
  }

}
