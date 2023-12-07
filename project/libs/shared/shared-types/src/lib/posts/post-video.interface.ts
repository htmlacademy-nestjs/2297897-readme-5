import { PostType } from './post-type.enum';
import { Post } from './post-base.interface';

export interface PostVideo extends Post<PostType.Video> {
  title: string;
  videoLink: string;
}
