import {Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req} from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { PostLikeRDO } from './rdo/post-like.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '@project/libs/shared/core';
import { RequestWithTokenPayload } from '@project/libs/shared/types';

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
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already create like on this post'
  })
  @Post('/like')
  @UseGuards(JWTAuthGuard)
  public async like(@Req() { user }: RequestWithTokenPayload, @Param('postId') postId: string): Promise<PostLikeRDO> {
    const newLike = await this.postLikeService.createLike(postId, user.sub);
    return fillDTO(PostLikeRDO, newLike.serialize());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Like has been deleted'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User don\'t like this post before'
  })
  @Delete('/dislike')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async dislike(@Req() { user }: RequestWithTokenPayload, @Param('postId') postId: string): Promise<void> {
    await this.postLikeService.deleteLike(postId, user.sub);
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
