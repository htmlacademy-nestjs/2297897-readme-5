import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/libs/shared/posts/models';
import { PostModule } from '../post/post.module';
import { PostLikeController } from './post-like.controller';
import { PostLikeService } from './post-like.service';
import { PostLikeRepository } from './post-like.repository';
import { JWTAccessStrategy } from '@project/libs/shared/core';

@Module({
  imports: [PrismaClientModule, PostModule],
  controllers: [PostLikeController],
  providers: [
    PostLikeService,
    PostLikeRepository,
    JWTAccessStrategy
  ]
})
export class PostLikeModule { }
