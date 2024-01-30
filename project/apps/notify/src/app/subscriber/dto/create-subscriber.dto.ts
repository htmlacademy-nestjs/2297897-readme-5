import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import { SUBSCRIBER_VALIDATION_MESSAGE } from '../subscriber.message';

export class CreateSubscriberDTO {
  @IsEmail({}, {message: SUBSCRIBER_VALIDATION_MESSAGE.EMAIL.NOT_VALID})
  public email: string;

  @IsString({message: SUBSCRIBER_VALIDATION_MESSAGE.NAME.NOT_VALID})
  @IsNotEmpty({message: SUBSCRIBER_VALIDATION_MESSAGE.NAME.IS_EMPTY})
  public name: string;
}
