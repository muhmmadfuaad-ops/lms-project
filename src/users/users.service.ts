
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Pool } from 'pg';

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
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows;
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
