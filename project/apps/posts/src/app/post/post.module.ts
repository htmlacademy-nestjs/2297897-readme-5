import { Module } from '@nestjs/common';
import { PostTagModule } from '../post-tag/post-tag.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaClientModule } from '@project/libs/shared/posts/models';
import { PostRepository } from './post.repository';

@Module({
  imports: [PostTagModule, PrismaClientModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService]
})
export class PostModule {}
