import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId } from './common/decorators';

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

  @UseGuards(AtGuard)
  @Post('logout')
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string, @Res() res: Response) {
    return this.authService.refreshTokens(userId, refreshToken, res);
  }
  
  @UseGuards(AtGuard)
  @Get('me')
  getUserById(@GetCurrentUserId() userId: number) {
    return this.authService.getUserById(userId);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('me')
  // getUserById(@Req() req: Request) {
  //   const user = req.user
  //   return this.usersService.getUserById(userId);
  // }

  // @UseGuards(RtGuard)
  // @Post('refresh')
  // refreshTokens(@Req() req: Request, @Res() res: Response) {
  //   const user = req.user;
  //   return this.authService.refreshTokens(user['sub'], user['refreshToken'], res);
  // }
}
