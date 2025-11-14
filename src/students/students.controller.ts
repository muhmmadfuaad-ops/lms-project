import { Controller, Get, Post, Delete, Put, Patch, Body, Param, Query, UseGuards, Req, ForbiddenException, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './interfaces/student.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { EditStudentDto } from './dto/edit-student.dto';
import { ApiTags, ApiBody, ApiParam, ApiQuery, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';
import { OwnershipGuard } from '../auth/ownership.guard';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post('/register')
  async createStudent(@Body() studentDto: CreateStudentDto): Promise<Student[]> {
    return this.studentsService.createStudent(studentDto);
  }

  // get all students
  // @Get()
  // @UseGuards(JwtAuthGuard, OwnershipGuard)
  // @ApiBearerAuth()
  // async findAllStudents(@Req() req): Promise<Student[]> {
  //   return this.studentsService.findAllStudents();
  // }

  @Get()
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiBearerAuth()
  async findAllStudents(@Req() req: any): Promise<Student[]> {
    console.log('JWT payload:', req.user);                  // decoded token
    console.log('Raw token:', req.headers.authorization);   // Bearer <token>

    return this.studentsService.findAllStudents();
  }

  //
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('search')
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Student name (fuzzy search, case-insensitive)',
    example: 'Muhammad',
  })
  async searchByName(@Query('name') name: string): Promise<Student[]> {
    console.log('Searching students by name:', name);
    return this.studentsService.findStudentByName(name);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Please sign in to access this resource.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the student to retrieve',
    example: '4',
  })
  async findStudentById(@Param('id', ParseIntPipe) id: number, @Req() req: any): Promise<Student> {
    return await this.studentsService.findStudentById(id, req);
  }

  @Post('/new')
  @ApiBody({
    description: 'Student creation payload',
    schema: {
      example: {
        name: 'Muhammad Fuaad Usman',
        email: 'alice@example.com',
        password: 'securePass123',
        age: 21,
        phone_number: '+1234567890',
        address: '123 Main St, City, Country',
      },
    },
  })
  async create(@Body() createStudentDto: CreateStudentDto) {
    console.log('api hit');
    console.log('Received body:', createStudentDto);
    this.studentsService.createStudent(createStudentDto);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiBearerAuth()
  async deleteStudent(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    console.log('Deleting student with id:', id);
    return this.studentsService.deleteStudent(id, req);
  }

  @Put('/update/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the student to update',
    example: '4',
  })
  @ApiBody({
    description: 'Student data to update',
    schema: {
      example: {
      "name": "Mike",
      "email": "mike@example.com",
      "age": 20,
      "enrollment_date": "2025-11-11T19:00:00.000Z",
      "phone_number": "+92-300-1234567",
      "address": "Karachi, Pakistan",
      "password": "pass123"
      }
    },
  })
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: CreateStudentDto) {
    console.log('Updating student with id:', id);
    console.log('Received body:', updateStudentDto);
    return this.studentsService.updateStudent(id, updateStudentDto);
  }

  @Patch('/edit/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the student to update',
    example: '4',
  })
  @ApiBody({
    description: 'Student data to update',
    schema: {
      example: {
      "name": "Mike",
      "email": "mike@example.com",
      "age": 20,
      "enrollment_date": "2025-11-11T19:00:00.000Z",
      "phone_number": "+92-300-1234567",
      "address": "Karachi, Pakistan",
      "password": "pass123"
      }
    },
  })
  async editStudent(@Param('id') id: string, @Body() updateStudentDto: EditStudentDto) {
    console.log('Updating student with id:', id);
    console.log('Received body:', updateStudentDto);
    return this.studentsService.editStudent(id, updateStudentDto);
  }
}
