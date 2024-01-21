import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostTagRepository } from '../post-tag/post-tag.repository';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostQuery } from './query/post.query';
import { PaginationResult } from '@project/libs/shared/types';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postTagRepository: PostTagRepository,
  ) { }

  public async createPost(dto: CreatePostDTO): Promise<PostEntity> {
    const postTags = await this.postTagRepository.findByIds(dto.tags);
    return this.postRepository.save(PostEntity.fromDto(dto, postTags));
  }

  public async getAllPosts(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
  }

  public async updatePost(id: string, dto: UpdatePostDTO): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTagsIds = existsPost.tags.map((postTag) => postTag.id);
        isSameTags = currentTagsIds.length === value.length && currentTagsIds.every((postTagId) => value.includes(postTagId));
      }

      if (!isSameTags) {
        existsPost.tags = await this.postTagRepository.findByIds(dto.tags)
      }

      if (isSameTags && !hasChanges) {
        return existsPost;
      }

      return this.postRepository.update(id, existsPost);
    }
  }

  public async deletePost(id: string) {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with id «${id}» not found`);
    }
  }
}







//const existsPost = await this.postRepository.findById(id);
//let isSameTags = true;
//let hasChanges = false;
//
//for (const [key, value] of Object.entries(dto)) {
//  if(value !== 'undefined' && key !== 'tags' && existsPost[key] !== value) {
//    existsPost[key] = value;
//    hasChanges = true;
//  }
//
//  if(key === 'tags' && value) {
//    const currentTagsIds = await this.postTagRepository.findByIds(existsPost.tags.map((tag) => tag.id));
//    isSameTags = currentTagsIds.length === value.length && currentTagsIds.every((postTag) => value.includes(postTag.id));
//
//    if(!isSameTags) {
//      existsPost.tags = await this.postTagRepository.findByIds(dto.tags);
//    }
//  }
//}
//
//if(isSameTags && !hasChanges) {
//  return existsPost;
//}
//
//return this.postRepository.update(id, existsPost);
