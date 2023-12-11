import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRDO {
  @ApiProperty({
    description: 'User unique ID',
    example: '11-22-33'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@local.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'user@local.com'
  })
  @Expose()
  public accessToken: string;
}
