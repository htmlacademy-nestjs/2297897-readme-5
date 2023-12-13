import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique adress',
    example: 'user@local.com'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '31337'
  })
  password: string;
}
