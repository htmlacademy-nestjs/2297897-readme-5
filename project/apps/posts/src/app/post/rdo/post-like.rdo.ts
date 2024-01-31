import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostCommentRDO {
  @ApiProperty({
    description: 'Current like ID in DB',
    example: '51bd7639-adc1-49c6-8fc1-be98969f0c7e'
  })
  @Expose()
  public Id: string;


  @ApiProperty({
    description: 'Like creator valid MongoId',
    example: '65a315542e79f6c6a9a4bfac'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Valid UUID of the post to which the like is attached',
    example: '51bd7639-adc1-49c6-8fc1-be98969f0c7e',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Date the like was created',
    example: '2024-01-22T19:27:49.162Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of last like update',
    example: '2024-02-22T19:27:49.162Z'
  })
  @Expose()
  public updatedAt: string;
}
