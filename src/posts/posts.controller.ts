import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDTO } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  getPosts() {
    return this.postsService.getPosts();
  }

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post('')
  createPosts(@Body() post: CreatePostDTO) {
  return this.postsService.createPost(post);
  }
}
