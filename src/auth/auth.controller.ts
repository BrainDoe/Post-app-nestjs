import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

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
  loginUser(@Body() userData: LoginUserDTO, @Res() res: Response) {
    return this.authService.logInUser(userData, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() req: Request) {
    const user = req.user['sub'];
    return this.authService.logout(user);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refreshTokens(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    return this.authService.refreshTokens(user['sub'], user['refreshToken'], res);
  }
}
