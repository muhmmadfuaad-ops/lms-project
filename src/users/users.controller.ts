import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
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

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<User> {
    //   const user = this.usersService.findOne(Number(id));
    //   if (!user) throw new NotFoundException(`User with id ${id} not found`);
    //   return user;
    // }

    // @Post()
    // async create(@Body() createUserDto: CreateUserDto) {
    //   this.usersService.create(createUserDto);
    // }
}
