import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CoursesService {
  constructor(@Inject('databaseService') private pool: Pool) {}

  async findAllCourses() {

    const result = await this.pool.query('SELECT * FROM "lms-project".courses');
    return result.rows;
  }
}
