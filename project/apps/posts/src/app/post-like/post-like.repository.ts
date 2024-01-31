import { BasePostgresRepository } from '@project/libs/shared/core';
import { PostLikeEntity } from './post-like.entity';
import { Like } from '@project/libs/shared/types';
import { PrismaClientService } from '@project/libs/shared/posts/models';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PostLikeRepository extends BasePostgresRepository<PostLikeEntity, Like> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostLikeEntity.fromObject)
  }

  public async findById(id: string): Promise<PostLikeEntity> {
    const document = await this.client.like.findFirst({
      where: { id }
    });

    if (!document) {
      throw new NotFoundException(`Like with id «${id}» not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByPostId(postId: string): Promise<PostLikeEntity[]> {
    const documents = await this.client.like.findMany({
      where: { postId },
    })

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async create(entity: PostLikeEntity): Promise<PostLikeEntity> {
    const record = await this.client.like.create({
      data: {
        userId: entity.userId,
        postId: entity.postId,
      }
    });

    entity.id = record.id;

    return entity;
  }

  public async findByIds (postId: string, userId: string) {
    return await this.client.like.findFirst({
      where: {
        AND: [{ postId }, { userId }]
      },
    });
  }

  public async delete(postId: string, userId: string): Promise<void> {
    const like = await this.findByIds(postId, userId);

    await this.client.like.delete({
      where: { id: like.id },
    })
  }
}
