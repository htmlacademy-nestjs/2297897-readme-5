import { PostType, Tag } from '@project/libs/shared/types';
import { IsEnum, IsUUID, ValidateIf, MinLength, MaxLength, IsUrl, IsOptional, IsMimeType, Length } from 'class-validator';
import { POST_AVAILABLE_VALUE } from '../post.constant';
import { POST_VALIDATION_MESSAGE } from '../post.message';

export class UpdatePostDTO {
  @IsOptional()
  @IsUUID(
    'all',
    {
      each: true,
      message: POST_VALIDATION_MESSAGE.TAGS.NOT_VALID,
    }
  )
  @Length(
    POST_AVAILABLE_VALUE.TAGS.MIN_COUNT,
    POST_AVAILABLE_VALUE.TAGS.MAX_COUNT,
    { message: POST_VALIDATION_MESSAGE.TAGS.COUNT_NOT_VALID }
  )
  public tags: Tag['id'][];

  @IsOptional()
  @IsEnum(
    PostType,
    { message: POST_VALIDATION_MESSAGE.POST_TYPE.NOT_VALID },
  )
  public postType: PostType;

  @ValidateIf(current => current.postType === PostType.Video || current.postType === PostType.Text)
  @IsOptional()
  @MinLength(
    POST_AVAILABLE_VALUE.TITLE.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.TITLE.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.TITLE.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.TITLE.MAX_LENGTH },
  )
  public title: string;

  @ValidateIf(current => current.postType === PostType.Video)
  @IsOptional()
  @IsUrl(
    {},
    { message: POST_VALIDATION_MESSAGE.VIDEO_LINK.NOT_VALID },
  )
  public videoLink?: string;

  @ValidateIf(current => current.postType === PostType.Text)
  @IsOptional()
  @MinLength(
    POST_AVAILABLE_VALUE.ANNOUNCEMENT.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.ANNOUNCEMENT.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.ANNOUNCEMENT.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.ANNOUNCEMENT.MAX_LENGTH },
  )
  public announcement?: string;

  @ValidateIf(current => current.postType === PostType.Text)
  @IsOptional()
  @MinLength(
    POST_AVAILABLE_VALUE.POST_TEXT.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.POST_TEXT.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.POST_TEXT.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.POST_TEXT.MAX_LENGTH },
  )
  public postText?: string;

  @ValidateIf(current => current.postType === PostType.Link)
  @IsOptional()
  @IsUrl(
    {},
    { message: POST_VALIDATION_MESSAGE.LINK.NOT_VALID },
  )
  public link?: string;

  @ValidateIf(current => current.postType === PostType.Link)
  @IsOptional()
  @MaxLength(
    POST_AVAILABLE_VALUE.DESCRIPTION.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH },
  )
  public description?: string;

  @ValidateIf(current => current.postType === PostType.Photo)
  @IsOptional()
  @IsMimeType()
  public photoUrl?: string;

  @ValidateIf(current => current.postType === PostType.Quote)
  @IsOptional()
  @MinLength(
    POST_AVAILABLE_VALUE.QUOTE_TEXT.MIN_LENGTH,
    { message: POST_VALIDATION_MESSAGE.QUOTE_TEXT.MIN_LENGTH },
  )
  @MaxLength(
    POST_AVAILABLE_VALUE.QUOTE_TEXT.MAX_LENGTH,
    { message: POST_VALIDATION_MESSAGE.QUOTE_TEXT.MAX_LENGTH },
  )
  public quoteText?: string;

  @ValidateIf(current => current.postType === PostType.Quote)
  @IsOptional()
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

