import { Module } from '@nestjs/common';
import { PostTagModule } from './post-tag/post-tag.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostTagModule, PostModule],
})
export class AppModule { }
