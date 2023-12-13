import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty({
    description: 'User name',
    example: 'RonWizley'
  })
  public name: string;

  @ApiProperty({
    description: 'User unique adress',
    example: 'user@local.com'
  })
  public email: string;

  @ApiPropertyOptional({
    description: 'User avatar url path',
    example: 'path/to/user/image.jpeg',

  })
  public avatarUrl: string;

  @ApiProperty({
    description: 'User password',
    example: '31337'
  })
  public password: string;
}
