import { Post } from './post-base.interface';
import { PostType } from './post-type.enum';

export interface PostQuote extends Post<PostType.Quote> {
  quoteText: string;
  quoteAuthor: string;
}
