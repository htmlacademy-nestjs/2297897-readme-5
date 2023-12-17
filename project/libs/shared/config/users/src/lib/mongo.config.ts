import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface MongoDatabaseConfig {
  name: string,
  host: string,
  port: number,
  user: string,
  password: string,
  authBase: string,
}

const databaseValidationSchema = Joi.object({
  name: Joi.string().required(),
  host: Joi.string().hostname().required(),
  port: Joi.number().port().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
})

function validateMongoConfig(config: MongoDatabaseConfig): void {
  const {error} = databaseValidationSchema.validate(config);
  if(error) {
    throw new Error(`[Database config validation error]: ${error.message}`)
  }
}

function getDatabaseConfig(): MongoDatabaseConfig {
  const config: MongoDatabaseConfig = {
    name: process.env.MONGO_DB,
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  }

  validateMongoConfig(config);
  return config;
}

export default registerAs('database', getDatabaseConfig);
