// database.module.ts
import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const databaseService = {
  provide: 'databaseService',
  useFactory: async () => {
    const pool = new Pool({
        // host: 'postgres-database',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
    return pool;
  },
};

@Module({
  providers: [databaseService],
  exports: [databaseService], // allow other modules to use it
})
export class DatabaseModule {}
