import { User } from '../users/user.interface';
import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;
  userId: User['id'];

  createdAt?: Date;
  updatedAt?: Date;

  postState: PostState;
  tags?: string[];

  creatorUserId?: User['id'];
  originalPostId?: string;
  isReposted?: boolean;

  postType: PostType;
  likesCount: number;
  commentsCount: number;
  publishDate: Date;
  user: User;

  link?: string;
  description?: string;
  photoUrl?: string;
  quoteText?: string;
  quoteAuthor?: string;
  announcement?: string;
  postText?: string;
  videoLink?: string;
}
