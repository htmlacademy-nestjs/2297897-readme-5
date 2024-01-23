import { Expose } from 'class-transformer';

export class PostCommentRDO {
  @Expose()
  public message: string;

  @Expose()
  public userId: string;

  @Expose()
  public postId: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;
}
