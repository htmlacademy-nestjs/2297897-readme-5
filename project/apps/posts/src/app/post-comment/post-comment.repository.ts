import { BasePostgresRepository } from '@project/libs/shared/core';
import { PostCommentEntity } from './post-comment.entity';
import { Comment } from '@project/libs/shared/types';
import { PrismaClientService } from '@project/libs/shared/posts/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_COMMENT_AVAILABLE_VALUE } from './post-comment.const';

@Injectable()
export class PostCommentRepository extends BasePostgresRepository<PostCommentEntity, Comment> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostCommentEntity.fromObject)
  }

  public async findById(id: string): Promise<PostCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Comment with id «${id}» not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByPostId(postId: string): Promise<PostCommentEntity[]> {
    const documents = await this.client.comment.findMany({
      where: { postId },
      take: POST_COMMENT_AVAILABLE_VALUE.MAX_COMMENTS_COUNT,
    })

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async save(entity: PostCommentEntity): Promise<PostCommentEntity> {
    const record = await this.client.comment.create({
      data: {
        userId: entity.userId,
        message: entity.message,
        postId: entity.postId,
      }
    });

    entity.id = record.id;

    return entity;
  }
}
