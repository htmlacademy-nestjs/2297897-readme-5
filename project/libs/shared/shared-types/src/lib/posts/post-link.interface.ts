import { Post } from './post-base.interface';
import { PostType } from "./post-type.enum";

export interface PostLink extends Post<PostType.Link> {
  link: string,
  description?: string
}
