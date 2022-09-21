import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { User } from './typeorm/entities/User.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PostsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'postsapp',
    entities: [User],
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}