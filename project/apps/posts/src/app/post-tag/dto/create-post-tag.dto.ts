import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';
import { POST_TAG_AVAILABLE_VALUE } from '../post-tag.constant';
import { POST_TAG_VALIDATION_MESSAGE } from '../post-tag.messages';

export class CreatePostTagDTO {
  @ApiProperty({
    description: 'Uniq tag name, single word with length between 3 and 8',
    example: 'Weather',
  })
  @Matches(
    POST_TAG_AVAILABLE_VALUE.TITLE.TYPE,
    { message: POST_TAG_VALIDATION_MESSAGE.TITLE.NOT_VALID }
  )
  @MinLength(
    POST_TAG_AVAILABLE_VALUE.TITLE.MIN_LENGTH,
    { message: POST_TAG_VALIDATION_MESSAGE.TITLE.MIN_LENGTH }
  )
  @MaxLength(
    POST_TAG_AVAILABLE_VALUE.TITLE.MAX_LENGTH,
    { message: POST_TAG_VALIDATION_MESSAGE.TITLE.MAX_LENGTH }
  )
  public title: string;
}
