import { PostState, PostType, Tag } from '@project/libs/shared/types';
import { Expose, Type } from 'class-transformer';
import { PostTagRDO } from '../../post-tag/rdo/post-tag.rdo';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostCommentRDO } from '../../post-comment/rdo/post-comment.rdo';

export class PostRDO {
  @ApiProperty({
    description: 'Unique post id',
    example: '11-22-33',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique user id',
    example: '44-55-66',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Serialized tags for post',
    example: [
      { id: 'a2ac020c-bb62-4564-81b2-3dde62f2d118', title: 'факты', createdAt: '2024-01-22T19:27:49.162Z', updatedAt: '2024-01-22T19:27:49.162Z' },
      { id: '3f00cb99-cc9d-4c53-b784-6da39cedf9ce', title: 'lorem', createdAt: '2024-02-22T19:27:49.162Z', updatedAt: '2024-02-22T19:27:49.162Z' },
    ],
  })
  @Expose()
  @Type(() => PostTagRDO)
  public tags: PostTagRDO[];

  @ApiProperty({
    description: 'Available type of post',
    example: 'quote',
    enum: PostType,
  })
  @Expose()
  public postType: PostType;

  @ApiProperty({
    description: 'Available state of post',
    example: 'draft',
    enum: PostState,
  })
  @Expose()
  public postState: PostState;

  @ApiProperty({
    description: 'Date the post was created',
    example: '2024-01-22T19:27:49.162Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of last post update',
    example: '2024-02-22T19:27:49.162Z'
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'A flag that records whether a post has been reposted',
    example: true,
  })
  @Expose()
  public isResposted: boolean;

  @ApiPropertyOptional({
    description: 'The original author ID of the post, that belonged to the post before reposting it',
    example: '77-88-99',
  })
  @Expose()
  public creatorUserId?: string;

  @ApiPropertyOptional({
    description: 'The original post ID that belonged to the post before reposting it',
    example: '11-12-13',
  })
  @Expose()
  public originalPostId?: string;

  @ApiPropertyOptional({
    description: 'Date on which the post changed its state',
    example: '11-12-13',
  })
  @Expose()
  public publishDate?: string;

  @ApiPropertyOptional({
    description: 'Valid link for link type post',
    example: 'https://www.wordreference.com/enru/about'
  })
  @Expose()
  public link?: string;

  @ApiPropertyOptional({
    description: 'Description for link type post',
    example: 'https://www.wordreference.com/enru/about'
  })
  @Expose()
  public description?: string;

  @ApiPropertyOptional({
    description: 'Valid photo url for photo type post',
    example: 'https://www.wordreference.com/enru/about'
  })
  @Expose()
  public photoUrl?: string;

  @ApiPropertyOptional({
    description: 'Quote text for quote type post',
    example: 'Knock on a stone bridge before crossing it'
  })
  @Expose()
  public quoteText?: string;

  @ApiPropertyOptional({
    description: 'quoteText author for quote type post',
    example: 'Rick Astley'
  })
  @Expose()
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'Title for video or text post',
    example: 'My cat wearing black pants and big black hat'
  })
  @Expose()
  public title?: string;

  @ApiPropertyOptional({
    description: 'Announcement for text post',
    example: 'My cat wearing black pants and big black hat, he have the best halloween suit'
  })
  @Expose()
  public announcement?: string;

  @ApiPropertyOptional({
    description: 'Main info for text type post',
    example: 'My cat wearing black pants and big black hat, he have the best halloween suit. My cat wearing black pants and big black hat, he have the best halloween suit'
  })
  @Expose()
  public postText?: string;

  @ApiPropertyOptional({
    description: 'Valid link to video, for video post',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  })
  @Expose()
  public videoLink?: string;

  @ApiProperty({
    description: 'List of comments for post',
    type: PostCommentRDO,
    example: [{
        message: 'Hello again, my little friends!',
        userId: '65a315542e79f6c6a9a4bfac',
        postId: '51bd7639-adc1-49c6-8fc1-be98969f0c7e',
        createdAt: '2024-01-23T01:44:24.189Z',
        updatedAt: '2024-01-23T01:44:24.189Z'
      }]
  })
  @Expose()
  public comments: string;
}
