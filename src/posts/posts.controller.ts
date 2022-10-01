import { Body, Controller, Get, Param, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { GetCurrentUserId, Public } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';
import { CreatePostDTO } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(AtGuard)
  @Get('')
  getPosts(@Res() res: Response) {
    return this.postsService.getPosts(res);
  }

  // @UseGuards(AtGuard)
  @Get('/:id')
  getPost(@GetCurrentUserId() userId: number, @Param('id') id: number) {
    return this.postsService.getPost(id);
  }

  // @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post('')
  createPost(@Body() post: CreatePostDTO) {
  return this.postsService.createPost(post);
  }

}
