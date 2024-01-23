import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDTO } from './dto/create-post-comment.dto';
import { fillDTO } from '@project/libs/shared/helpers';
import { PostCommentRDO } from './rdo/post-comment.rdo';

@Controller('posts/:postId/comments')
export class PostCommentController {
  constructor(
    private readonly postCommentService: PostCommentService,
  ) { }

  @Post('/')
  public async create(@Body() dto: CreatePostCommentDTO, @Param('postId') postId: string): Promise<PostCommentRDO> {
    const newComment = await this.postCommentService.createComment(postId, dto);
    return fillDTO(PostCommentRDO, newComment.serialize());
  }

  @Get('/')
  public async show(@Param('postId') postId: string): Promise<PostCommentRDO> {
    const comments = await this.postCommentService.getCommentsByPostId(postId);
    return fillDTO(PostCommentRDO, comments.map((comment) => comment.serialize()));
  }
}
