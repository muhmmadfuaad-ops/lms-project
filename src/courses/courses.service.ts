import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(@Inject('databaseService') private pool: Pool) {}

  async findAllCourses() {
    const result = await this.pool.query('SELECT * FROM courses');
    return result.rows;
  }

  async createCourse(course: CreateCourseDto) {
    console.log('course:', course);
    const { title, description, credits, price, currency } = course;
    const result = await this.pool.query(
      'INSERT INTO courses (title, description, credits, price, currency) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, credits, price, currency],
    );
    return result.rows[0];
  }
}
