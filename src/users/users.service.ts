import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserType } from './userType/user.type';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getAllUsers() {
    return await this.userRepository.find({
      order: {id: 'ASC'},
      select: ['name', 'email', 'id']
    });
  }

  async updateUser(id: number, user: UpdateUserType) {
    let pass: string;
    if(user.password) {
      pass = await this._hashPassword(user.password)
    }
    user.password = pass;
    const updateUser = await this.userRepository.update(id , { ...user });

    return updateUser
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id)
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}, order: {id: 'ASC'},
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
}
