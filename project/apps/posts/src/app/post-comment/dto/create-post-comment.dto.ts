import { IsMongoId, IsUUID, MaxLength, MinLength } from 'class-validator';
import { POST_COMMENT_AVAILABLE_VALUE } from '../post-comment.const';
import { POST_COMMENT_VALIDATION_MESSAGE } from '../post-comment.message';

export class CreatePostCommentDTO {
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

  @IsMongoId(
    {
      message: POST_COMMENT_VALIDATION_MESSAGE.USER_ID.NOT_VALID
    }
  )
  public userId: string;
}
