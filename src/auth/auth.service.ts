import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserType, LoginUserType, Tokens } from './authTypes/auth.type';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              private jwtService: JwtService) {}

  async createUser(user: CreateUserType) {
    const {name, email, password} = user;

    const existingUser = await this.userRepository.findOne({where: {email}});
    if(existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this._hashData(password);

    const newUser = this.userRepository.create({
      name, email, password: hashedPassword
    })

    const savedUser = await this.userRepository.save(newUser);

    const {password:pass, role, ...rest } = savedUser;

    const tokens = await this._getTokens(rest.id, rest.email);

    await this._updateRtHash(rest.id, tokens.refreshToken);

    return {
      ...rest,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email
    };
  }

  async logInUser(user: LoginUserType, res: Response) {
    const {email, password} = user;

    const existingUser = await this.userRepository.findOne({where: {email} });
    if(!existingUser) {
      throw new BadRequestException('Invalid Credentials');
    }

    const passwordMatch = await this.compareHash(password, existingUser.password);
    if(!passwordMatch) {
      throw new BadRequestException('Invalid Credentials');
    }
    // return {token};
    const {password: pass, role, hashedRt, ...rest} = existingUser;

    const tokens = await this._getTokens(rest.id, rest.email);

    await this._updateRtHash(rest.id, tokens.refreshToken);

    return res.status(200).json({
      message: 'Success',
      data: {
        ...rest,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    })

    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email
    }
  }

  async logout(userId: number) {
    return await this.userRepository.update({id: userId}, {hashedRt: null }  )
  }

  // Utility functions
  private async _hashData(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  private async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private async _getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        email
      }, {secret: 'at-secret', expiresIn: 60 * 15}),
      this.jwtService.signAsync({
        sub: userId,
        email
      }, {secret: 'rt-secret', expiresIn: 60 * 60 * 24 * 7})
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    }
  }

  private async _updateRtHash(userId: number, rt: string) {
    const hash = await this._hashData(rt);

    const existingUser = await this.userRepository.update({id: userId}, { hashedRt: hash});
  }

  // SIGN JWT TOKEN
  // private _signToken = (args: {id: number, email: string}) => {
  //   return this.jwt.signAsync(args, {secret: jwtSecret});
  // }

  // SIGN JWT REFRESH TOKEN
  // private _signRefreshToken = (id: number, email: string) => {
  //   return this.jwt.sign({id, email});
  // }
}
