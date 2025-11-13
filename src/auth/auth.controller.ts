
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    description: 'Student creation payload',
    schema: {
      example: {
        "name": "Ali Khan",
        "password": "password123"
      },
    },
  })
  signIn(@Body() signInDto: Record<string, string>) {
    console.log('signIn controller triggered')
    console.log('signInDto:', signInDto)

    return this.authService.signIn(signInDto.name, signInDto.password);
  }
}
