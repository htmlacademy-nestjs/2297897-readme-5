import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { POST_LIKE_VALIDATION_MESSAGE } from '../post-like.message';

export class CreatePostLikeDTO {
  @ApiProperty({ description: 'Like creator valid MongoId', example: '65a315542e79f6c6a9a4bfac' })
  @IsMongoId({ message: POST_LIKE_VALIDATION_MESSAGE.USER_ID.NOT_VALID })
  public userId: string;

}
