import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostWithPaginationRDO } from './rdo/post-with-pagination.rdo';
import { FindTitleDTO } from './dto/find-title-post.dto';
import { PostRDO } from './rdo/post.rdo';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { PostLikeRDO } from './rdo/post-like.rdo';


@ApiTags('Posts')
@UseFilters(AxiosExceptionFilter)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All founded posts',
  })
  @Get('/')
  public async index(@Req() { url }: Request): Promise<PostWithPaginationRDO> {
    const [, query] = url.split('?');
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/?${query}`);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts whose titles match the query or empty array, if posts doesn\'t matched'
  })
  @Post('/title')
  public async findByTitle(@Body() dto: FindTitleDTO): Promise<PostRDO> {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/title`, dto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post with this id not found'
  })
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'Post has been found'
  })
  @Get('/:id')
  public async show(@Param('id') id: string): Promise<PostRDO> {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/${id}`);
    return data;
  }

  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/`, dto);
    return data;
  }

  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'The post has been successfully updated.'
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDTO): Promise<PostRDO> {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${id}`, dto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post with this id not found'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The post has been successfully removed'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${id}`);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new like has been created'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already create like on this post'
  })
  @Post('/:id/likes/like')
  public async like(@Req() req: Request, @Param('id') postId: string): Promise<PostLikeRDO> {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/${postId}/likes/like`, null, {
      headers: { 'Authorization': req.headers['authorization'] }
    } );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Like has been deleted'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User don\'t like this post before'
  })
  @Delete('/:id/likes/dislike')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async dislike(@Req() req: Request, @Param('id') @Param() postId: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${postId}/likes/dislike`, {
      headers: { 'Authorization': req.headers['authorization'] }
    })

    return {data};
  }
}

