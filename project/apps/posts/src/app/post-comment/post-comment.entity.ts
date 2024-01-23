import { Entity, EntityIdType } from "@project/libs/shared/core";
import { Comment } from "@project/libs/shared/types";
import { CreatePostCommentDTO } from "./dto/create-post-comment.dto";

export class PostCommentEntity implements Comment, Entity<EntityIdType, Comment> {
  public id?: string;
  public message: string;
  public postId: string;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Comment) {
    if (!data.message || !data.postId || !data.userId) {
      throw new Error('Comment message, postId, userId is required!');
    }

    this.populate(data);
  }

  public populate(data: Comment) {
    this.id = data.id;
    this.message = data.message;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public serialize(): Comment {
    return {
      id: this.id,
      message: this.message,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static fromObject(data: Comment): PostCommentEntity {
    return new PostCommentEntity(data);
  }

  static fromDto(dto: CreatePostCommentDTO, postId: string) {
    return new PostCommentEntity({
      ...dto,
      postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
