import { BasePostgresRepository } from '@project/libs/shared/core';
import { PostEntity } from './post.entity';
import { Post } from '@project/libs/shared/types';
import { PrismaClientService } from '@project/libs/shared/posts/models';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostEntity.fromObject);
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
    const serializedEntity = entity.serialize();
    const record = await this.client.post.create({
      data: {
        ...serializedEntity,
        tags: {
          connect: serializedEntity.tags
            .map(({ id }) => ({ id })),
        },
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        }
      }
    })

    entity.id = record.id;
    return entity;
  }

//  public async update(id: string, entity: PostEntity): Promise<PostEntity> {
//    const serializedEntity = entity.serialize();
//    delete serializedEntity.likes;
//    delete serializedEntity.comments;
//
//    const updatedRecord = await this.client.post.update({
//      where: { id },
//      data: {
//        ...serializedEntity,
//        tags: {
//          set: serializedEntity.tags.map((tag) => ({ id: tag.id })),
//        },
//      },
//      include: {
//        likes: true,
//        comments: true
//      },
//    })
//  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: { id }
    })
  }

  public async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: { id },
      include: {
        tags: true,
        comments: true,
        likes: true,
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id «${id}» not found`);
    }

    return this.createEntityFromDocument(document as Post);
  }
}
