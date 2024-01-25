import { Like } from '../actions/like.interface';
import { Tag } from './tag.interface';
import { User } from '../users/user.interface';
import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';
import { Comment } from '../actions/comment.interface';
import { $Enums } from '@prisma/client';

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

  likes: Like[];
  comments: Comment[];

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
