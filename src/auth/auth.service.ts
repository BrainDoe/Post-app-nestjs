import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserType, LoginUserType } from './authTypes/auth.type';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

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
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email
    };
  }

  async logInUser(user: LoginUserType) {
    const {email, password} = user;

    const existingUser = await this.userRepository.findOne({where: {email}});
    if(!existingUser) {
      throw new BadRequestException('Ivalid Credentials');
    }

    const passwordMatch = await this.compareHash(password, existingUser.password);
    if(!passwordMatch) {
      throw new BadRequestException('Invalid Credentials');
    }
    // return {token};

    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email
    }
  }

  // Utility functions
  private async _hashData(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  private async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
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
