import { PostState, PostType, Tag } from "@project/libs/shared/types";
import { Expose, Type } from "class-transformer";
import { PostTagRDO } from "../../post-tag/rdo/post-tag.rdo";

export class PostRDO {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  @Type(() => PostTagRDO)
  public tags: Tag[];

  @Expose()
  public postType: PostType;

  @Expose()
  public postState: PostState;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public isResposted: boolean;

  @Expose()
  public creatorUserId: string;

  @Expose()
  public originalPostId: string;

  @Expose()
  public publishDate: string;

  @Expose()
  public link: string;

  @Expose()
  public description: string;

  @Expose()
  public photoUrl: string;

  @Expose()
  public quoteText: string;

  @Expose()
  public quoteAuthor: string;

  @Expose()
  public title: string;

  @Expose()
  public announcement: string;

  @Expose()
  public postText: string;

  @Expose()
  public videoLink: string;
}
