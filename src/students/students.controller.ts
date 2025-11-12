import { Controller, Get, Post, Delete, Put, Patch, Body, Param, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './interfaces/student.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { EditStudentDto } from './dto/edit-student.dto';
import { ApiTags, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

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
  async deleteStudent(@Param('id') id: string) {
    console.log('Deleting student with id:', id);
    return this.studentsService.deleteStudent(id);
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
