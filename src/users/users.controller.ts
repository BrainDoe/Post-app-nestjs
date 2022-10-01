import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId, Public } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AtGuard)
  @Get('')
  getUsers() {
    return this.usersService.getAllUsers();
  }

  // @UseGuards(AtGuard)
  @Get('me')
  getUserById(@GetCurrentUserId() userId: number) {
    return this.usersService.getUserById(userId);
  }

  // @UseGuards(AtGuard)
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }
  
  // @UseGuards(AtGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
