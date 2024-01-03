import { Like } from '../actions/like.interface';
import { Tag } from '../actions/tag.interface';
import { User } from '../users/user.interface';
import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;
  userId: User['id'];
  postType: PostType;
  postState: PostState;
  tags: Tag[];

  createdAt?: Date;
  updatedAt?: Date;
  publishDate?: Date;

  creatorUserId?: User['id'];
  originalPostId?: string;
  isReposted?: boolean;

  likesCount: number;
  likes: Like[],

  commentsCount: number;
  comments: Comment[],

  title?: string;
  link?: string;
  description?: string;
  photoUrl?: string;
  quoteText?: string;
  quoteAuthor?: string;
  announcement?: string;
  postText?: string;
  videoLink?: string;
}
