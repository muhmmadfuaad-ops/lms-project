
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  // private students: User[] = [
  //   { id: 1, name: 'Alice', email: 'alice@example.com', age: 30, password: 'password1' },
  //   { id: 2, name: 'Bob',   email: 'bob@example.com', age: 30, password: 'password1' },
  // ];

  private pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Alhamdulillah@321',
    database: 'LMS Project',
  });

  async findAll() {
    const result = await this.pool.query('SELECT * FROM students');
    return result.rows;
  }


  // create(user: User) {
  //   this.students.push(user);
  // }

  // findAll(): User[] {
  //   return this.students;
  // }

  // findOne(id: number): User | undefined {
  //   return this.students.find(u => u.id === id);
  // }
}
