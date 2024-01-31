import { SortDirection } from '@project/libs/shared/types';
import { PAGINATION_DEFAULT_VALUE } from './pagination.constant';
import { IsArray, IsIn, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostQuery {
  @Transform((value) => +value || PAGINATION_DEFAULT_VALUE.POST_COUNT_LIMIT)
  @IsOptional()
  public limit: number = PAGINATION_DEFAULT_VALUE.POST_COUNT_LIMIT;

  @IsUUID('all', {each: true})
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = PAGINATION_DEFAULT_VALUE.SORT_DIRECTION;

  @Transform((value) => +value || PAGINATION_DEFAULT_VALUE.PAGE_COUNT)
  @IsOptional()
  public page: number = PAGINATION_DEFAULT_VALUE.PAGE_COUNT;
}
