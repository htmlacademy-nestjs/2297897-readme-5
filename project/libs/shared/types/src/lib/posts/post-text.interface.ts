import { PostType } from './post-type.enum';
import { Post } from './post-base.interface';

export interface PostText extends Post<PostType.Text> {
  title: string;
  announcement: string;
  postText: string;
}
