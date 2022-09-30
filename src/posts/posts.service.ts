import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post.entity';
import { CreatePostType } from './postType/post.type';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}

  async getPosts() {
    return await this.postRepository.find({
      order: {id: 'ASC'},
      select: ['id', 'title', 'description', 'image']
    });
  }

  async createPost(post: CreatePostType) {
    const newPost = this.postRepository.create({...post})

    const savedPost = await this.postRepository.save(newPost);

    return savedPost
  }
}
