import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { POST_COMMENT_AVAILABLE_VALUE } from '../post-comment.const';
import { POST_COMMENT_VALIDATION_MESSAGE } from '../post-comment.message';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostCommentDTO {
  @ApiProperty({
    description: 'Comment message',
    example: 'Very good info! I like it!'
  })
  @MinLength(
    POST_COMMENT_AVAILABLE_VALUE.MESSAGE.MIN_LENGTH,
    {
      message: POST_COMMENT_VALIDATION_MESSAGE.MESSAGE.MIN_LENGTH
    }
  )
  @MaxLength(
    POST_COMMENT_AVAILABLE_VALUE.MESSAGE.MAX_LENGTH,
    {
      message: POST_COMMENT_VALIDATION_MESSAGE.MESSAGE.MAX_LENGTH
    }
  )
  public message: string;

  @ApiProperty({
    description: 'Comment creator valid MongoId',
    example: '65a315542e79f6c6a9a4bfac'
  })
  @IsMongoId(
    {
      message: POST_COMMENT_VALIDATION_MESSAGE.USER_ID.NOT_VALID
    }
  )
  public userId: string;
}
