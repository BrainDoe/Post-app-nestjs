import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from 'src/typeorm/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
