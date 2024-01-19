import { PaginationInterface } from '@project/libs/shared/types';
import { PostRDO } from './post.rdo';
import { Expose } from 'class-transformer';

export class PostWithPaginationRDO implements PaginationInterface<PostRDO> {
  @Expose()
  public entity: PostRDO[];

  @Expose()
  public totalItems: number;

  @Expose()
  public totalPages: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
