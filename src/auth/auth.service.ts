
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Pool } from 'pg';
import { Student } from '../students/interfaces/student.interface';
import { QueryResult } from 'pg';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  // constructor(private studentsService: StudentsService) {}
  constructor(@Inject('databaseService') private pool: Pool) {}
  async signIn(name: string, password: string): Promise<any> {
    if (!name) {
      console.log('name is required');
      throw new UnauthorizedException('No name provided');
    }
    // console.log('name:', name)
    // console.log('password:', password)

    const result: QueryResult<Student>   = await this.pool.query('SELECT * FROM "lms-project".students WHERE name = $1', [name]);

    if (result.rows.length == 0) {
      throw new UnauthorizedException('No student exists with this name');
    }

    const student = result.rows[0];
    console.log('student:', student)

    if (student?.password !== password) {
      throw new UnauthorizedException("passwords don't match");
    }

    // ✅ Generate JWT token
    const payload = { id: student.id, name: student.name, email: student.email };
    const secret = process.env.JWT_SECRET || 'defaultSecret';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    // console.log('token:', token);
    return { access_token: token };
  }
}