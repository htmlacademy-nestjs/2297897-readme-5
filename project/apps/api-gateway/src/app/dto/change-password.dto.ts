import { ApiProperty } from '@nestjs/swagger';
import { USER_VALIDATON_MESSAGE } from '../../../../users/src/app/user/validation.messages';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { USER_AVAILABLE_VALUE } from '../../../../users/src/app/user/user.constant';

export class ChangePasswordDTO {
  @ApiProperty({
    description: 'Old user password',
    example: '31337'
  })
  @IsString()
  @MinLength(
    USER_AVAILABLE_VALUE.PASSWORD.MIN_LENGTH,
    { message: USER_VALIDATON_MESSAGE.PASSWORD_LENGTH_NOT_VALID.MIN_LENGTH }
  )
  @MaxLength(
    USER_AVAILABLE_VALUE.PASSWORD.MAX_LENGTH,
    { message: USER_VALIDATON_MESSAGE.PASSWORD_LENGTH_NOT_VALID.MAX_LENGTH }
  )
  oldPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: '73313'
  })
  @IsString()
  @MinLength(
    USER_AVAILABLE_VALUE.PASSWORD.MIN_LENGTH,
    { message: USER_VALIDATON_MESSAGE.PASSWORD_LENGTH_NOT_VALID.MIN_LENGTH }
  )
  @MaxLength(
    USER_AVAILABLE_VALUE.PASSWORD.MAX_LENGTH,
    { message: USER_VALIDATON_MESSAGE.PASSWORD_LENGTH_NOT_VALID.MAX_LENGTH }
  )
  newPassword: string;
}
