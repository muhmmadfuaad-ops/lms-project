import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
      envFilePath: '.env', // Path to your .env file
    }), StudentsModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}