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
    example: 'e66d1d45dd724cc2a0bcb7085e9ad825.f746413a553e464782da5231d6f53568.f746413a553e464782da5231d6f53568'
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Access token',
    example: 'e661231231231231a0bcb7085e9ad825.f746413a553e464782da5231d6f53568.f746413a553e464782da5231d6f53568'
  })
  @Expose()
  public refreshToken: string;
}
