
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Pool } from 'pg';
import { Student } from '../students/interfaces/student.interface';
import { QueryResult } from 'pg';

@Injectable()
export class AuthService {
  // constructor(private studentsService: StudentsService) {}
  constructor(@Inject('databaseService') private pool: Pool) {}
  async signIn(name: string, password: string): Promise<any> {
    // const user = await this.studentsService.updateStudent();
    if (!name) {
    //   throw an error 'no name provided'
    }

    const result: QueryResult<Student>   = await this.pool.query('SELECT * FROM "lms-project".students WHERE name = $1', [name]);
    const student = result.rows[0];
    if (student?.password !== password) {
      throw new UnauthorizedException();
    }
  }
}