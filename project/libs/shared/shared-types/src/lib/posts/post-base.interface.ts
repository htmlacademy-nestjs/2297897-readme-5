import { User } from '../users/user.interface';
import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface Post<T extends PostType> {
  id: string;
  tags?: string[];
  type: T;
  author: User;
  createdAt: Date;
  postState: PostState;
}
