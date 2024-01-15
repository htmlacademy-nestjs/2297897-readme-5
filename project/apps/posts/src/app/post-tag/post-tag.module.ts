import { Module } from '@nestjs/common';
import { PostTagRepository } from './post-tag.repository';
import { PostTagService } from './post-tag.service';
import { PrismaClientModule } from '@project/libs/shared/posts/models';
import { PostTagController } from './post-tag.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [PostTagController],
  providers: [PostTagRepository, PostTagService],
})
export class PostTagModule { }
