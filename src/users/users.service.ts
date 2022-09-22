import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserType, LoginUserType, UpdateUserType } from './userType/user.type';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  getAllUsers() {
    return this.userRepository.find({
      order: {id: 'ASC'},
      select: ['name', 'email', 'id']
    });
  }

  async createUser(user: CreateUserType) {
    const {name, email, password} = user;

    const existingUser = await this.userRepository.findOne({where: {email}});
    if(existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this._hashPassword(password);

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

    const passwordMatch = await this.comparePassword(password, existingUser.password);
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

  async updateUser(id: number, user: UpdateUserType) {
    let pass: string;
    if(user.password) {
      pass = await this._hashPassword(user.password)
    }
    user.password = pass;
    const updateUser = await this.userRepository.update({ id }, { ...user });

    return updateUser
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id)
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({where: {id}, order: {id: 'ASC'},
    select: ['name', 'email', 'id']});
    return user;
  }

  private async _hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, hash: string) {
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
