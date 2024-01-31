import { BasePostgresRepository } from '@project/libs/shared/core';
import { PostEntity } from './post.entity';
import { Post, PaginationResult } from '@project/libs/shared/types';
import { PrismaClientService } from '@project/libs/shared/posts/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PostQuery } from './query/post.query';

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

  private async getPostsCount(where: Prisma.PostWhereInput): Promise<number> {
    return await this.client.post.count({ where });
  }

  private calculatePostPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags,
          }
        }
      }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([this.client.post.findMany({
      where, orderBy, skip, take,
      include: {
        tags: true,
        comments: true,
        likes: true,
      }
    }),
    this.getPostsCount(where),
    ])

    return {
      entities: records.map((record) => this.createEntityFromDocument(record as Post)),
      totalItems: postCount,
      currentPage: query?.page,
      totalPages: this.calculatePostPage(postCount, take),
      itemsPerPage: take,
    }
  }

  public async update(id: string, entity: PostEntity): Promise<PostEntity> {
    const serializedEntity = entity.serialize();

    const updatedRecord = await this.client.post.update({
      where: { id },
      data: {
        ...serializedEntity,
        tags: {
          set: serializedEntity.tags.map((tag) => ({ id: tag.id })),
        },
        likes: {
          set: serializedEntity.likes.map((like) => ({ id: like.id })),
        },
        comments: {
          set: serializedEntity.comments.map((comment) => ({ id: comment.id }))
        }
      },
      include: {
        tags: true,
        likes: true,
        comments: true,
      },
    })

    return this.createEntityFromDocument(updatedRecord as Post);
  }

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

  public async findByTitle(title: string): Promise<PostEntity[]> {
    const documents = await this.client.post.findMany({
      where: {
        title: {
        contains: title
        }
    },
      include: {
        tags: true,
        comments: true,
        likes: true,
      }
    });


    return documents.map((document) => this.createEntityFromDocument(document as Post));
  }
}
