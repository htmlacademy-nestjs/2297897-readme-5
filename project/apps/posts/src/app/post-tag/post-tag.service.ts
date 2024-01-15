import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PostTagRepository } from './post-tag.repository';
import { CreatePostTagDTO } from './dto/create-post-tag.dto';
import { PostTagEntity } from './post-tag.entity';
import { UpdatePostTagDTO } from './dto/update-post-tag.dto';

@Injectable()
export class PostTagService {
  constructor(
    private readonly postTagRepositoty: PostTagRepository,
  ) { }

  public async createPostTag(dto: CreatePostTagDTO): Promise<PostTagEntity> {
    const newPostTag = new PostTagEntity(dto);
    await this.postTagRepositoty.save(newPostTag);

    return newPostTag;
  }

  public async getPostTagById(id: string): Promise<PostTagEntity> {
    return this.postTagRepositoty.findById(id);;
  }

  public async getAllPostTags(): Promise<PostTagEntity[]> {
    return this.postTagRepositoty.find();
  }

  public async updatePostTag(id: string, dto: UpdatePostTagDTO): Promise<PostTagEntity> {
    const postTagEntity = new PostTagEntity(dto);
    await this.postTagRepositoty.update(id, postTagEntity);

    return postTagEntity;
  }

  public async deletePostTag(id: string): Promise<void> {
    await this.postTagRepositoty.deleteById(id);
  }
}
