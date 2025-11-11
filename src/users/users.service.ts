
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Pool } from 'pg';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
 
  private pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Alhamdulillah@321',
    database: 'lms-project',
  });

  async findAll() {
    const result = await this.pool.query('SELECT * FROM students');
    return result.rows;
  }

  async findStudentByName(name: string) {
    try {
      // If no name provided, return all students
      if (!name) {
        const result = await this.pool.query('SELECT * FROM students');
        return result.rows;
      }

      // If name provided, search case-insensitively
      const result = await this.pool.query(
        'SELECT * FROM students WHERE name ILIKE $1',
        [`%${name}%`]
      );

      return result.rows;
    } catch (error) {
      console.error('Error fetching student by name:', error);
      throw error;
    }
  }

  async createUser(user: User) {
    console.log('user:', user)
    const { name, email, password } = user;
    const result = await this.pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password],
    );
    return result.rows[0];
  }

  async deleteUser(id: string) {
    try {
      const result = await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return { message: `No user found with id ${id}` };
      }
      return { message: `User ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async updateUser(id: string, user: User) {
    try {
      const { name, email, password, age} = user
      const result = await this.pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3, age = $4 WHERE id = $5 RETURNING *',
        [name, email, password, age, id]  // ✅ Include id as parameter
      );
      if (result.rowCount === 0) {
        return { message: `No user found with id ${id}` };
      }
      return { message: `User ${id} updated successfully`, user: result.rows[0] };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async editUser(id: string, user: EditUserDto) {
    try {
      const fields: string[] = [];  // ✅ explicitly typed
      const values: any[] = [];
      let index = 1;

      // Dynamically add only provided fields
      for (const [key, value] of Object.entries(user)) {
        if (value !== undefined) {
          fields.push(`${key} = $${index}`);
          values.push(value);
          index++;
        }
      }

      // If no fields to update
      if (fields.length === 0) {
        return { message: 'No fields provided for update.' };
      }

      // Add ID as last parameter
      values.push(id);

      const query = `
        UPDATE users 
        SET ${fields.join(', ')} 
        WHERE id = $${index}
        RETURNING *;
      `;

      console.log('Generated SQL:', query);

      const result = await this.pool.query(query, values);

      if (result.rowCount === 0) {
        return { message: `No user found with id ${id}` };
      }

      return {
        message: `User ${id} updated successfully.`,
        user: result.rows[0],
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}