import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { MONGO_ID_VALIDATION_PIPE_MESSAGE } from './mongo-id-validation-pipe.message';

@Injectable()
export class MongoIDValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(MONGO_ID_VALIDATION_PIPE_MESSAGE.NOT_VALID_TYPE);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(MONGO_ID_VALIDATION_PIPE_MESSAGE.BAD_MONGO_ID);
    }

    return value;
  }
}
