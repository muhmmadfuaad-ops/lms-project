import { Controller, Get, Post, Delete, Put, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
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

    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: string) {
      console.log('Deleting user with id:', id);
      return this.usersService.deleteUser(id);
    }

    @Put('/update/:id')
    @ApiParam({
      name: 'id',
      required: true,
      description: 'The ID of the user to update',
      example: '4',
    })
    @ApiBody({
      description: 'User data to update',
      schema: {
        example: {
          name: 'Muhammad Fuaad Usman',
          email: 'alice@example.com',
          password: 'newpassword123',
          age: 32,
        },
      },
    })
    async updateUser(
      @Param('id') id: string,
      @Body() updateUserDto: CreateUserDto
    ) {
      console.log('Updating user with id:', id);
      console.log('Received body:', updateUserDto);
      return this.usersService.updateUser(id, updateUserDto);
    }

    @Patch('/edit/:id')
    @ApiParam({
      name: 'id',
      required: true,
      description: 'The ID of the user to update',
      example: '4',
    })
    @ApiBody({
      description: 'User data to update',
      schema: {
        example: {
          name: 'Muhammad Fuaad Usman',
          email: 'alice@example.com',
          password: 'newpassword123',
          age: 32,
        },
      },
    })
    async editUser(
      @Param('id') id: string,
      @Body() updateUserDto: EditUserDto
    ) {
      console.log('Updating user with id:', id);
      console.log('Received body:', updateUserDto);
      return this.usersService.editUser(id, updateUserDto);
    }
}
