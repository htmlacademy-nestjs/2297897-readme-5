import { PaginationResult } from '@project/libs/shared/types';
import { PostRDO } from './post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostWithPaginationRDO implements PaginationResult<PostRDO> {
  @ApiProperty({
    description: 'List of posts',
    type: [PostRDO],
    example: [{
      id: 'a928035a-aaa9-4df9-999f-8de262c5be11',
      userId: '65a315542e79f6c6a9a4bfac',
      tags: [
        { id: 'a2ac020c-bb62-4564-81b2-3dde62f2d118', title: 'факты', createdAt: '2024-01-22T19:27:49.162Z', updatedAt: '2024-01-22T19:27:49.162Z' },
        { id: '3f00cb99-cc9d-4c53-b784-6da39cedf9ce', title: 'lorem', createdAt: '2024-02-22T19:27:49.162Z', updatedAt: '2024-02-22T19:27:49.162Z' },
      ],
      postType: 'quote',
      quoteText: 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э.',
      quoteAuthor: 'LipsumOrg',
    }],
  })
  @Expose()
  public entities: PostRDO[];

  @ApiProperty({
    description: 'Total items count',
    example: 12,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Counted number of pages for a given number of posts',
    example: 2,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Current page for skipping a certain number of posts already received',
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Number of posts per page',
    example: 10,
  })
  @Expose()
  public itemsPerPage: number;
}
