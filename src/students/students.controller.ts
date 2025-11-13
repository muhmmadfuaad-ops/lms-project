import { Controller, Get, Post, Delete, Put, Patch, Body, Param, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './interfaces/student.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { EditStudentDto } from './dto/edit-student.dto';
import { ApiTags, ApiBody, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  /**
   * Helper method to check if user has access to a specific student resource
   * @param tokenUserId - User ID from JWT token
   * @param tokenRole - User role from JWT token
   * @param resourceId - The student ID being accessed
   * @throws ForbiddenException if user lacks permission
   */
  private checkOwnershipOrAdmin(tokenUserId: number, tokenRole: string | undefined, resourceId: number): void {
    const isOwner = Number.isFinite(tokenUserId) && tokenUserId === resourceId;
    const isAdmin = tokenRole === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
  }

  // get all students
  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the student to retrieve',
    example: '4',
  })
  async findStudentById(@Param('id') id: string, @Req() req: any): Promise<Student> {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new NotFoundException(`Invalid id: ${id}`);
    }

    // Extract user id and role from JWT payload
    const tokenUserId = Number(req.user?.id ?? req.user?.sub ?? req.user?.userId);
    const tokenRole = req.user?.role;

    // Check authorization using reusable helper
    this.checkOwnershipOrAdmin(tokenUserId, tokenRole, numericId);

    const rows = await this.studentsService.findStudentById(numericId);
    if (!rows || rows.length === 0) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return rows[0];
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the student to delete',
    example: '4',
  })
  async deleteStudent(@Param('id') id: string, @Req() req: any) {
    console.log('Received delete request for id:', id);
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new NotFoundException(`Invalid id: ${id}`);
    }

    // Extract user id and role from JWT payload
    const tokenUserId = Number(req.user?.id ?? req.user?.sub ?? req.user?.userId);
    const tokenRole = req.user?.role;

    // Check authorization using reusable helper
    this.checkOwnershipOrAdmin(tokenUserId, tokenRole, numericId);

    console.log('Deleting student with id:', id);
    return this.studentsService.deleteStudent(numericId);
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
