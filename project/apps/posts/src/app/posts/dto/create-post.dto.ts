import {User, PostState, Post, PostType, Tag, Like} from '@project/libs/shared/types';

export class CreatePostDTO implements Post {
  public userId: User['id'];

  public creatorUserId: User['id'];

  public postState: PostState;

  public tags: Tag[];

  public postType: PostType;

  public likes: Like[];

  public likesCount: number;

  public comments: Comment[];

  public commentsCount: number;

  public publishDate: Date;

  public user: User;

  public link?: string;

  public description?: string;

  public photoUrl?: string;

  public quoteText?: string;

  public quoteAuthor?: string;

  public announcement?: string;

  public postText?: string;

  public videoLink?: string;
}

