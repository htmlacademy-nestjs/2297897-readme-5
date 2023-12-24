import {User, PostState, Post, PostType} from '@project/libs/shared/types';

export class CreatePostDTO implements Post {
  public userId: User['id'];

  public creatorUserId: User['id'];

  public postState: PostState;

  public tags?: string[];

  public postType: PostType;

  public likesCount: number;

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

