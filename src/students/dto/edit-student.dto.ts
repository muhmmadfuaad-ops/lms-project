import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

export class EditStudentDto extends PartialType(CreateStudentDto) {}
