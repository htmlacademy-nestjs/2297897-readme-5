import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PostTagRepository } from './post-tag.repository';
import { CreatePostTagDTO } from './dto/create-post-tag.dto';
import { PostTagEntity } from './post-tag.entity';
import { UpdatePostTagDTO } from './dto/update-post-tag.dto';

@Injectable()
export class PostTagService {
  constructor(
    private readonly postTagRepository: PostTagRepository,
  ) { }

  public async createPostTag(dto: CreatePostTagDTO): Promise<PostTagEntity> {
    dto.title = dto.title.toLocaleLowerCase();

    const existsPostTag = (await this.postTagRepository.find({ title: dto.title })).at(0);

    if (existsPostTag) {
      throw new ConflictException(`Tag with title «${dto.title}» already exists`)
    }

    const newPostTag = new PostTagEntity(dto);
    await this.postTagRepository.save(newPostTag);

    return newPostTag;
  }

  public async getPostTagById(id: string): Promise<PostTagEntity> {
    return this.postTagRepository.findById(id);;
  }

  public async getAllPostTags(): Promise<PostTagEntity[]> {
    return this.postTagRepository.find();
  }

  public async getPostTagsByIds(postTagsIds: string[]): Promise<PostTagEntity[]> {
    if(!postTagsIds) {
      return [];
    }

    const postTags = await this.postTagRepository.findByIds(postTagsIds);

    if(postTagsIds.length !== postTags.length) {
      const foundPostTagsIds = postTags.map((postTag) => postTag.id);
      const notFoundPostTagsIds = postTagsIds.filter((id) => !foundPostTagsIds.includes(id));

      if(notFoundPostTagsIds.length) {
        throw new NotFoundException(`Tags with ids: ${notFoundPostTagsIds.join(', ')} not found`);
      }
    }

    return postTags;
  }

  public async updatePostTag(id: string, dto: UpdatePostTagDTO): Promise<PostTagEntity> {
    dto.title = dto.title.toLocaleLowerCase();

    const sameNamedTag = (await this.postTagRepository.find({ title: dto.title })).at(0);

    if (sameNamedTag) {
      throw new ConflictException(`Tag with title «${dto.title}» already exists`)
    }

    const postTagEntity = new PostTagEntity(dto);

    try {
      const updatedPostTag = await this.postTagRepository.update(id, postTagEntity);
      return updatedPostTag;
    } catch {
      throw new NotFoundException(`Tag with id «${id}» not found`);
    }
  }

  public async deletePostTag(id: string): Promise<void> {
    try {
      await this.postTagRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Tag with id «${id}» not found`);
    }
  }
}
