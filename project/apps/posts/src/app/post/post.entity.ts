import { Entity, EntityIdType } from '@project/libs/shared/core';
import { Like, Post, PostState, PostType, User, PostProperty } from '@project/libs/shared/types';
import { PostTagEntity } from '../post-tag/post-tag.entity';
import { POST_AVAILABLE_VALUE } from './post.constant';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostCommentEntity } from '../post-comment/post-comment.entity';

export class PostEntity implements Post, Entity<EntityIdType, Post> {
  public id?: string;
  public userId: User['id'];
  public postType: PostType;
  public postState: PostState;
  public tags: PostTagEntity[];

  public createdAt?: Date;
  public updatedAt?: Date;
  public publishDate?: Date;

  public isReposted: boolean;
  public creatorUserId?: User['id'];
  public originalPostId?: string;

  public likes: Like[];       //  | LikeEntity[]     |
  public comments: PostCommentEntity[];

  public title?: string;
  public link?: string;
  public description?: string;
  public photoUrl?: string;
  public quoteText?: string;
  public quoteAuthor?: string;
  public announcement?: string;
  public postText?: string;
  public videoLink?: string;

  private excludeRelatedFields() {
    const propertiesToExclude = POST_AVAILABLE_VALUE.EXCLUDABLE_PROPERTIES[this.postType.toUpperCase()];

    if(propertiesToExclude) {
      propertiesToExclude.forEach((property) => delete this[property]);
    }
  }

  public populate(data: Post) {
    this.id = data.id;
    this.userId = data.userId;
    this.postType = data.postType;
    this.postState = data.postState;
    this.tags = data.tags.map((tag) => PostTagEntity.fromObject(tag));
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.publishDate = data.publishDate;
    this.creatorUserId = data.creatorUserId;
    this.originalPostId = data.originalPostId;
    this.isReposted = data.isReposted;
    this.likes = [];
    this.comments = data.comments.map((comment) => PostCommentEntity.fromObject(comment));
    this.title = data.title;
    this.link = data.link;
    this.description = data.description;
    this.photoUrl = data.photoUrl;
    this.quoteText = data.quoteText;
    this.quoteAuthor = data.quoteAuthor;
    this.announcement = data.announcement;
    this.postText = data.postText;
    this.videoLink = data.videoLink;

    this.excludeRelatedFields();
    return this;
  }

   public serialize(): Post {
    const filteredProperties = Object.values(PostProperty).filter((property) => this[property] !== undefined);
    const serializedPost = {
      id: this.id,
      userId: this.userId,
      postType: this.postType,
      postState: this.postState,
      tags: this.tags.map((tag) => tag.serialize()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isReposted: this.isReposted,
      publishDate: this.publishDate,
      comments: this.comments?.map((comment) => comment.serialize()) ?? [],
      likes: [],
    };

    if(this.isReposted) {
      serializedPost['creatorUserId'] = this.creatorUserId;
      serializedPost['originalPostId'] = this.originalPostId;
    }

    for(const property of filteredProperties) {
      serializedPost[property] = this[property];
    }

    return serializedPost;
  }

  static fromObject(data: Post): PostEntity {
    return new PostEntity()
      .populate(data);
  }

  static fromDto(dto: CreatePostDTO, tags: PostTagEntity[]): PostEntity {
    const entity = new PostEntity();

    for(const [property, value] of Object.entries(dto)) {
      entity[property] = value;
    }

    entity.excludeRelatedFields();
    entity.tags = tags;

    return entity;
  }
}
