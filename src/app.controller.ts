import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService
  ) {}

  @Get()
  async getHello() {
    console.log(await this.userService.findAll())
    return this.appService.getHello();
  }
}
