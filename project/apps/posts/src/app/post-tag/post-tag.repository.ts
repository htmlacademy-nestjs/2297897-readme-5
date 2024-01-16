import { BasePostgresRepository } from '@project/libs/shared/core';
import { PostTagEntity } from './post-tag.entity';
import { Tag } from '@project/libs/shared/types';
import { PrismaClientService } from '@project/libs/shared/posts/models';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TagFilter, tagFilterToPrismaFilter } from './post-tag.filter';

@Injectable()
export class PostTagRepository extends BasePostgresRepository<PostTagEntity, Tag> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PostTagEntity.fromObject);
  }

  public async findById(id: string): Promise<PostTagEntity> {
    const document = await this.client.tag.findFirst({
      where: { id },
    })

    if (!document) {
      throw new NotFoundException(`Tag with id «${id}» not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: TagFilter): Promise<PostTagEntity[]> {
    const where = filter ?? tagFilterToPrismaFilter(filter);
    const documents = await this.client.tag.findMany({ where });
    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async save(entity: PostTagEntity): Promise<PostTagEntity> {
    const record = await this.client.tag.create({
      data: { ...entity.serialize() },
    });

    entity.id = record.id;
    return entity;
  }

  public async update(id: string, entity: PostTagEntity): Promise<PostTagEntity> {
    const updatedDocument = await this.client.tag.update({
      where: { id },
      data: { title: entity.title },
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: { id },
    });
  }
}
