import { Controller, Get, Post, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Post("/new")
    async create(@Body() createUserDto: CreateUserDto) {
      console.log("api hit")
      console.log('Received body:', createUserDto);
      this.usersService.createUser(createUserDto);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
      console.log('Deleting user with id:', id);
      return this.usersService.deleteUser(id);
    }
}
