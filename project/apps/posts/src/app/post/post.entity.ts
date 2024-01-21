import { Entity, EntityIdType } from '@project/libs/shared/core';
import { Like, Post, PostState, PostType, User, Comment, PostProperty } from '@project/libs/shared/types';
import { PostTagEntity } from '../post-tag/post-tag.entity';
import { POST_AVAILABLE_VALUE } from './post.constant';
import { CreatePostDTO } from './dto/create-post.dto';

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
  public comments: Comment[]; //  | CommentEntity[]  |

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
    this.id = data.id ?? undefined;
    this.userId = data.userId;
    this.postType = data.postType;
    this.postState = data.postState ?? undefined;
    this.tags = data.tags.map((tag) => PostTagEntity.fromObject(tag));
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.publishDate = data.publishDate ?? undefined;
    this.creatorUserId = data.creatorUserId ?? undefined;
    this.originalPostId = data.originalPostId ?? undefined;
    this.isReposted = data.isReposted ?? undefined;
    this.likes = [];
    this.comments = [];
    this.title = data.title ?? undefined;
    this.link = data.link ?? undefined;
    this.description = data.description ?? undefined;
    this.photoUrl = data.photoUrl ?? undefined;
    this.quoteText = data.quoteText ?? undefined;
    this.quoteAuthor = data.quoteAuthor ?? undefined;
    this.announcement = data.announcement ?? undefined;
    this.postText = data.postText ?? undefined;
    this.videoLink = data.videoLink ?? undefined;

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
      comments: [],
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
