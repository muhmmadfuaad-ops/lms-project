import { Injectable } from '@nestjs/common';
import { Student } from './interfaces/student.interface';
import { Pool } from 'pg';
import { EditStudentDto } from './dto/edit-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  private pool = new Pool({
    // host: 'postgres-database',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  async findAll() {
    const result = await this.pool.query('SELECT * FROM "lms-project".students');
    return result.rows;
  }

  async findStudentByName(name: string) {
    try {
      if (!name) {
        const result = await this.pool.query('SELECT * FROM students');
        return result.rows;
      }

      const result = await this.pool.query('SELECT * FROM students WHERE name ILIKE $1', [`%${name}%`]);

      return result.rows;
    } catch (error) {
      console.error('Error fetching student by name:', error);
      throw error;
    }
  }

  async createStudent(student: CreateStudentDto) {
    console.log('student:', student);
    const { name, email, password, age, phone_number, address } = student;
    const result = await this.pool.query(
      'INSERT INTO students (name, email, password, age, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, password, age, phone_number, address],
    );
    return result.rows[0];
  }

  async deleteStudent(id: string) {
    try {
      const result = await this.pool.query('DELETE FROM students WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return { message: `No student found with id ${id}` };
      }
      return { message: `Student ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }

  async updateStudent(id: string, student: CreateStudentDto) {
    try {
      const { name, email, password, age } = student;
      const result = await this.pool.query(
        'UPDATE students SET name = $1, email = $2, password = $3, age = $4 WHERE id = $5 RETURNING *',
        [name, email, password, age, id],
      );
      if (result.rowCount === 0) {
        return { message: `No student found with id ${id}` };
      }
      return { message: `Student ${id} updated successfully`, student: result.rows[0] };
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  async editStudent(id: string, student: EditStudentDto) {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let index = 1;

      for (const [key, value] of Object.entries(student)) {
        if (value !== undefined) {
          fields.push(`${key} = $${index}`);
          values.push(value);
          index++;
        }
      }

      if (fields.length === 0) {
        return { message: 'No fields provided for update.' };
      }

      values.push(id);

      const query = `
        UPDATE students 
        SET ${fields.join(', ')} 
        WHERE id = $${index}
        RETURNING *;
      `;

      console.log('Generated SQL:', query);

      const result = await this.pool.query(query, values);

      if (result.rowCount === 0) {
        return { message: `No student found with id ${id}` };
      }

      return {
        message: `Student ${id} updated successfully.`,
        student: result.rows[0],
      };
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }
}
