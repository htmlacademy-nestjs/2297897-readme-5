import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { PostLikeRDO } from './rdo/post-like.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@project/libs/shared/core';
import { TokenPayload } from '@project/libs/shared/types';

@ApiTags('likes')
@Controller('posts/:postId/likes')
export class PostLikeController {
  constructor(
    private readonly postLikeService: PostLikeService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new like has been created'
  })
  @Post('/like')
  public async like(@Body() userId: string, @Param('postId') postId: string): Promise<PostLikeRDO> {
    const newLike = await this.postLikeService.createLike(postId, userId);
    return fillDTO(PostLikeRDO, newLike.serialize());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Like has been deleted'
  })
  @Post('/dislike')
  public async dislike(@Body() userId: string, @Param('postId') postId: string): Promise<void> {
    await this.postLikeService.deleteLike(postId, userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like list for the post',
    type: [PostLikeRDO]
  })
  @Get('/')
  public async show(@Param('postId') postId: string): Promise<PostLikeRDO> {
    const likes = await this.postLikeService.getLikesByPostId(postId);
    return fillDTO(PostLikeRDO, likes.map((like) => like.serialize()));
  }
}
