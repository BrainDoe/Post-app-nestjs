import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({whitelist: true}))
  createUser(@Body() userData: CreateUserDTO) {
    return this.authService.createUser(userData);
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post('login')
  loginUser(@Body() userData: LoginUserDTO, @Res() res: any) {
    return this.authService.logInUser(userData, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() req: Request) {
    const user = req.user['sub'];
    return this.authService.logout(user);
  }
}
