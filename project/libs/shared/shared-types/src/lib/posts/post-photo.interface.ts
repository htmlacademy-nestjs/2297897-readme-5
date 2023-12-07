import { PostType } from './post-type.enum';
import { Post } from './post-base.interface';

export interface PostPhoto extends Post<PostType.Photo> {
  photoUrl: string;
}
