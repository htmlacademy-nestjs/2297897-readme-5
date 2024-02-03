import { Entity, EntityIdType } from '@project/libs/shared/core';
import { Like } from '@project/libs/shared/types';

export class PostLikeEntity implements Like, Entity<EntityIdType, Like> {
  public id?: string;
  public postId: string;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Like) {
    if (!data.postId || !data.userId) {
      throw new Error('Comment message, postId, userId is required!');
    }

    this.populate(data);
  }

  public populate(data: Like) {
    this.id = data.id;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public serialize(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static fromObject(data: Like): PostLikeEntity {
    return new PostLikeEntity(data);
  }

  static fromDto(userId: string, postId: string) {
    return new PostLikeEntity({
      userId,
      postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
