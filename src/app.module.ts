import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
      envFilePath: '.env', // Path to your .env file
    }), UsersModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}