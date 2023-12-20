import { IsNumber, IsString, Max, Min, validateOrReject } from "class-validator";
import { EnvValidationMessages } from "./mongo.messages";
import { VALID_PORT } from "./mongo.const";

export class MongoConfiguration {
  @IsString({message: EnvValidationMessages.DBNameRequired})
  public name: string;

  @IsString({message: EnvValidationMessages.DBHostRequired})
  public host: string;

  @IsNumber({}, {message: EnvValidationMessages.DBPortRequired})
  @Min(VALID_PORT.MIN_PORT)
  @Max(VALID_PORT.MAX_PORT)
  public port: number;

  @IsString({message: EnvValidationMessages.DBUserRequired})
  public user: string;

  @IsString({message: EnvValidationMessages.DBPasswordRequired})
  public password: string;

  @IsString({message: EnvValidationMessages.DBBaseAuthRequired})
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
