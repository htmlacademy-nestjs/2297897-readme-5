import { User, PostType, Tag } from '@project/libs/shared/types';
import { IsEnum, IsMongoId, IsUUID, ValidateIf, MinLength, MaxLength, IsUrl, IsOptional, IsMimeType, Length, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { POST_AVAILABLE_VALUE } from '../const';
import { POST_VALIDATION_MESSAGE } from '../const';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty({
    description: 'User unique ID',
    example: '11-22-33',
  })
  @IsMongoId(
    { message: POST_VALIDATION_MESSAGE.USER_ID.NOT_VALID },
  )
  public userId: User['id'];

  @ApiPropertyOptional({
    description: 'Id\'s of tags for post',
    example: ['a2ac020c-bb62-4564-81b2-3dde62f2d118', '3f00cb99-cc9d-4c53-b784-6da39cedf9ce'],
  })
  @IsOptional()
  @IsUUID(
    'all',
    {
      each: true,
      message: POST_VALIDATION_MESSAGE.TAGS.NOT_VALID,
    }
  )
  @ArrayMaxSize(
    POST_AVAILABLE_VALUE.TAGS.MAX_COUNT,
    { message: POST_VALIDATION_MESSAGE.TAGS.COUNT_NOT_VALID }
  )
  public tags?: Tag['id'][];

  @ApiProperty({
    description: 'Available type of post',
    example: 'quote',
    enum: PostType
  })
  @IsEnum(
    PostType,
    { message: POST_VALIDATION_MESSAGE.POST_TYPE.NOT_VALID },
  )
  public postType: PostType;

  @ApiPropertyOptional({
    description: 'Title for video or text post',
    example: 'My cat wearing black pants and big black hat'
  })
  @ValidateIf(current => current.postType === PostType.Video || current.postType === PostType.Text)
  @MinLength(
    POST_AVAILABLE_VALUE.TITLE.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.TITLE.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.TITLE.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.TITLE.MAX_LENGTH },
  )
  public title?: string;

  @ApiPropertyOptional({
    description: 'Valid link to video, for video post',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  })
  @ValidateIf(current => current.postType === PostType.Video)
  @IsUrl(
    {},
    { message: POST_VALIDATION_MESSAGE.VIDEO_LINK.NOT_VALID },
  )
  public videoLink?: string;

  @ApiPropertyOptional({
    description: 'Announcement for text post',
    example: 'My cat wearing black pants and big black hat, he have the best halloween suit'
  })
  @ValidateIf(current => current.postType === PostType.Text)
  @MinLength(
    POST_AVAILABLE_VALUE.ANNOUNCEMENT.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.ANNOUNCEMENT.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.ANNOUNCEMENT.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.ANNOUNCEMENT.MAX_LENGTH },
  )
  public announcement?: string;

  @ApiPropertyOptional({
    description: 'Main info for text type post',
    example: 'My cat wearing black pants and big black hat, he have the best halloween suit. My cat wearing black pants and big black hat, he have the best halloween suit'
  })
  @ValidateIf(current => current.postType === PostType.Text)
  @MinLength(
    POST_AVAILABLE_VALUE.POST_TEXT.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.POST_TEXT.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.POST_TEXT.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.POST_TEXT.MAX_LENGTH },
  )
  public postText?: string;

  @ApiPropertyOptional({
    description: 'Valid link for link type post',
    example: 'https://www.wordreference.com/enru/about'
  })
  @ValidateIf(current => current.postType === PostType.Link)
  @IsUrl(
    {},
    { message: POST_VALIDATION_MESSAGE.LINK.NOT_VALID },
  )
  public link?: string;

  @ApiPropertyOptional({
    description: 'Description for link type post',
    example: 'https://www.wordreference.com/enru/about'
  })
  @ValidateIf(current => current.postType === PostType.Link)
  @IsOptional()
  @MaxLength(
    POST_AVAILABLE_VALUE.DESCRIPTION.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH },
  )
  public description?: string;

  @ApiPropertyOptional({
    description: 'Valid photo url for photo type post',
    example: 'https://www.wordreference.com/enru/about'
  })
  @ValidateIf(current => current.postType === PostType.Photo)
  public photoUrl?: string;

  @ApiPropertyOptional({
    description: 'Quote text for quote type post',
    example: 'Knock on a stone bridge before crossing it'
  })
  @ValidateIf(current => current.postType === PostType.Quote)
  @MinLength(
    POST_AVAILABLE_VALUE.QUOTE_TEXT.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.QUOTE_TEXT.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.QUOTE_TEXT.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.QUOTE_TEXT.MAX_LENGTH },
  )
  public quoteText?: string;

  @ApiPropertyOptional({
    description: 'quoteText author for quote type post',
    example: 'Rick Astley'
  })
  @ValidateIf(current => current.postType === PostType.Quote)
  @MinLength(
    POST_AVAILABLE_VALUE.QUOTE_AUTHOR.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.QUOTE_AUTHOR.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.QUOTE_AUTHOR.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.QUOTE_AUTHOR.MAX_LENGTH },
  )
  public quoteAuthor?: string;
}

