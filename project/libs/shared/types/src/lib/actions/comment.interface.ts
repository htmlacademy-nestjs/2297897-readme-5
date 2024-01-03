import { Post } from "../posts/post.interface";

export interface Comment {
  id?: string;
  message: string;
  postId?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
