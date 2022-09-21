import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('')
  createUser(@Body() userData: CreateUserDTO) {
    return this.usersService.createUser(userData);
  }

  @Post('login')
  loginUser(@Body() userData: LoginUserDTO) {
    return this.usersService.logInUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }
  
  @Delete('id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }
}
