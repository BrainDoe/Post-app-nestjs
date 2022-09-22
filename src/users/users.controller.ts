import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Post('')
  @UsePipes(new ValidationPipe({whitelist: true}))
  createUser(@Body() userData: CreateUserDTO) {
    return this.usersService.createUser(userData);
  }

  // @UsePipes(new ValidationPipe({whitelist: true}))
  @Post('login')
  loginUser(@Body() userData: LoginUserDTO) {
    return this.usersService.logInUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }
  
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
