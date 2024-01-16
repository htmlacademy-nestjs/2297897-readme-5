import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { USER_AVAILABLE_VALUE } from '../../user/user.constant';
import { USER_VALIDATON_MESSAGE } from '../validation.messages';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User name',
    example: 'RonWizley'
  })
  @IsString()
  @MinLength(
    USER_AVAILABLE_VALUE.NAME.MIN_LENGTH,
    {message: USER_VALIDATON_MESSAGE.USER_NAME_NOT_VALID.MIN_LENGTH}
  )
  @MaxLength(
    USER_AVAILABLE_VALUE.NAME.MAX_LENGTH,
    {message: USER_VALIDATON_MESSAGE.USER_NAME_NOT_VALID.MAX_LENGTH}
  )
  public name: string;

  @ApiProperty({
    description: 'User unique adress',
    example: 'user@local.com'
  })
  @IsEmail({}, {message: USER_VALIDATON_MESSAGE.EMAIL_NOT_VALID})
  public email: string;

  @ApiPropertyOptional({
    description: 'User avatar url path',
    example: 'path/to/user/image.jpeg',

  })
  @IsOptional()
  @IsString()
  public avatarUrl: string;

  @ApiProperty({
    description: 'User password',
    example: '31337'
  })
  @IsString()
  @MinLength(
    USER_AVAILABLE_VALUE.PASSWORD.MIN_LENGTH,
    {message: USER_VALIDATON_MESSAGE.PASSWORD_LENGTH_NOT_VALID.MIN_LENGTH}
  )
  @MaxLength(
    USER_AVAILABLE_VALUE.PASSWORD.MAX_LENGTH,
    {message: USER_VALIDATON_MESSAGE.PASSWORD_LENGTH_NOT_VALID.MAX_LENGTH}
  )
  public password: string;
}
