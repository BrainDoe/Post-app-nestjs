import { Injectable, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post.entity';
import { CreatePostType } from './postType/post.type';
import { Response } from 'express';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}

  async getPosts(@Res() res: Response) {
    const posts = await this.postRepository.find({
      order: {id: 'ASC'},
      select: ['id', 'title', 'description', 'image']
    });

    return res.status(200).json({
      status: 'success',
      message: 'All posts retrieved',
      data: posts
    });
  }

  async getPost(postId: number) {
    const post = await this.postRepository.findOne(
      {where: {id: postId}, order: {id: 'ASC'},
      select: ['id', 'title', 'description', 'image']}
    );

    return post;
  }

  async createPost(post: CreatePostType) {
    const newPost = this.postRepository.create({...post})

    const savedPost = await this.postRepository.save(newPost);

    return savedPost
  }
}
