
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../database/database.module';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [UsersModule, DatabaseModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {

}
