import { Module } from '@nestjs/common';
import { PostTagModule } from './post-tag/post-tag.module';
import { PostModule } from './post/post.module';
import { ConfigPostsModule } from '@project/libs/shared/config/posts';
import { PostCommentModule } from './post-comment/post-comment.module';

@Module({
  imports: [
    PostTagModule,
    PostModule,
    ConfigPostsModule,
    PostCommentModule,
  ],
})
export class AppModule { }
