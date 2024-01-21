import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { PostRDO } from './rdo/post.rdo';
import { PostQuery } from './query/post.query';
import { PostWithPaginationRDO } from './rdo/post-with-pagination.rdo';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) { }

  @Get('/')
  public async index(@Query() query?: PostQuery): Promise<PostWithPaginationRDO> {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.serialize()),
    };
    return fillDTO(PostWithPaginationRDO, result);
  }

  @Get('/:id')
  public async show(@Param('id') id: string): Promise<PostRDO> {
    const post = await this.postService.getPost(id);
    return fillDTO(PostRDO, post.serialize());
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDTO) {
    const newPost = await this.postService.createPost(dto);
    return fillDTO(PostRDO, newPost.serialize());
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDTO): Promise<PostRDO> {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillDTO(PostRDO, updatedPost.serialize());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.postService.deletePost(id);
  }
}
