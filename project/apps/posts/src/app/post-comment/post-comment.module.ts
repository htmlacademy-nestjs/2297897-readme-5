import { Module } from "@nestjs/common";
import { PrismaClientModule } from "@project/libs/shared/posts/models";
import { PostModule } from "../post/post.module";
import { PostCommentController } from "./post-comment.controller";
import { PostCommentService } from "./post-comment.service";
import { PostCommentRepository } from "./post-comment.repository";

@Module({
  imports: [PrismaClientModule, PostModule],
  controllers: [PostCommentController],
  providers: [PostCommentService, PostCommentRepository]
})
export class PostCommentModule { }
