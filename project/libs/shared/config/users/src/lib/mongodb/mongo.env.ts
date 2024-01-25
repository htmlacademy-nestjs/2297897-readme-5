import { IsNumber, IsString, Max, Min, validateOrReject } from 'class-validator';
import { EnvValidationMessage } from './mongo.message';
import { VALID_PORT } from './mongo.const';

export class MongoConfiguration {
  @IsString({message: EnvValidationMessage.DBNameRequired})
  public name: string;

  @IsString({message: EnvValidationMessage.DBHostRequired})
  public host: string;

  @IsNumber({}, {message: EnvValidationMessage.DBPortRequired})
  @Min(VALID_PORT.MIN_PORT)
  @Max(VALID_PORT.MAX_PORT)
  public port: number;

  @IsString({message: EnvValidationMessage.DBUserRequired})
  public user: string;

  @IsString({message: EnvValidationMessage.DBPasswordRequired})
  public password: string;

  @IsString({message: EnvValidationMessage.DBBaseAuthRequired})
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
