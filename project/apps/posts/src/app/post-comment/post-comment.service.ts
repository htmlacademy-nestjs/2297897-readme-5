import { Injectable, NotFoundException } from '@nestjs/common';
import { PostCommentRepository } from './post-comment.repository';
import { PostService } from '../post/post.service';
import { PostCommentEntity } from './post-comment.entity';
import { CreatePostCommentDTO } from './dto/create-post-comment.dto';

@Injectable()
export class PostCommentService {
  constructor(
    private readonly postCommentRepository: PostCommentRepository,
    private readonly postService: PostService
  ) { }

  public async getCommentById(id: string): Promise<PostCommentEntity> {
    return this.postCommentRepository.findById(id);
  }

  public async getCommentsByPostId(postId: string): Promise<PostCommentEntity[]> {
    try{
      await this.postService.getPost(postId);
    } catch {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }

    return this.postCommentRepository.findByPostId(postId);
  }

  public async createComment(postId: string, dto: CreatePostCommentDTO): Promise<PostCommentEntity> {
      try{
        await this.postService.getPost(postId);
      } catch {
        throw new NotFoundException(`Post with id «${postId}» not found`);
      }

    return this.postCommentRepository.save(PostCommentEntity.fromDto(dto, postId))
  }
}
