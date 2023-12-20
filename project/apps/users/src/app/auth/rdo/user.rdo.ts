import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRDO {
  @ApiProperty({
    description: 'User unique ID',
    example: '11-22-33'
  })
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@local.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User avatar url path',
    example: 'path/to/user/image.jpeg'
  })
  @Expose()
  public avatarUrl: string;
}
