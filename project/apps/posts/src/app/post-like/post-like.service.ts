import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PostLikeRepository } from './post-like.repository';
import { PostService } from '../post/post.service';
import { PostLikeEntity } from './post-like.entity';

@Injectable()
export class PostLikeService {
  constructor(
    private readonly postLikeRepository: PostLikeRepository,
    private readonly postService: PostService
  ) { }

  public async getLikeById(id: string): Promise<PostLikeEntity> {
    return this.postLikeRepository.findById(id);
  }

  public async getLikesByPostId(postId: string): Promise<PostLikeEntity[]> {
    try {
      await this.postService.getPost(postId);
    } catch {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }

    return this.postLikeRepository.findByPostId(postId);
  }

  public async createLike(postId: string, userId: string): Promise<PostLikeEntity> {
    try {
      await this.postService.getPost(postId);
    } catch {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }

    const likeExists = await this.postLikeRepository.findByIds(postId, userId);

    if (likeExists) {
      throw new ConflictException('User already create like on this post');
    }

    return this.postLikeRepository.create(PostLikeEntity.fromDto(userId, postId));
  }

  public async deleteLike(postId: string, userId: string): Promise<void> {
    const likeExists = await this.postLikeRepository.findByIds(postId, userId);

    if (!likeExists) {
      throw new ConflictException('User don\'t like this post before');
    }
    await this.postLikeRepository.delete(postId, userId);
  }
}
