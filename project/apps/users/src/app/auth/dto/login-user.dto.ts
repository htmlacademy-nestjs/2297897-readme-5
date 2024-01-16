import { ApiProperty } from '@nestjs/swagger';
import { USER_VALIDATON_MESSAGE } from '../validation.messages';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { USER_AVAILABLE_VALUE } from '../../user/user.constant';

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique adress',
    example: 'user@local.com'
  })
  @IsEmail({}, {message: USER_VALIDATON_MESSAGE.EMAIL_NOT_VALID})
  email: string;

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
  password: string;
}
