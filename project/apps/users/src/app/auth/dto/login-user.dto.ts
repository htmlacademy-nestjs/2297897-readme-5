import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique adress',
    example: 'user@local.com'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '313373'
  })
  password: string;
}
