import { User } from '../users/user.interface';
import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface Post<T extends PostType> {
  id: string;
  type: T;
  author: User;
  createdAt: Date;
  postState: PostState;
  tags?: string[];
  //link post
  link?: string,
  description?: string,
  //photo post
  photoUrl?: string;
  //quote post
  quoteText?: string;
  quoteAuthor?: string;
  //text post
  announcement?: string;
  postText?: string;
  //video post
  videoLink?: string;
}
