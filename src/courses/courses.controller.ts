import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnershipGuard } from '../auth/ownership.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Student } from '../students/interfaces/student.interface';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './interfaces/course.interface';

@Controller('courses')
export class CoursesController {

  constructor(private coursesService: CoursesService) {}

  @Post('/create')
  async createCourse(@Body() courseDto: CreateCourseDto): Promise<Course[]> {
    return this.coursesService.createCourse(courseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiBearerAuth()
  async findAllCourses(@Req() req: any): Promise<Student[]> {
    console.log('JWT payload:', req.user);                  // decoded token
    console.log('Raw token:', req.headers.authorization);   // Bearer <token>

    return this.coursesService.findAllCourses();
  }

}
