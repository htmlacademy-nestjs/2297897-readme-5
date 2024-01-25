import * as Joi from 'joi';
import { Environment } from '@project/libs/shared/types';
import { registerAs } from '@nestjs/config';

export interface FileVaultConfig {
  environment: Environment,
  port: number,
  uploadDirectory: string,
  db: {
    host: string,
    port: number,
    user: string,
    name: string,
    password: string,
    authBase: string
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().required(),
  port: Joi.number().required(),
  uploadDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  })
})

function validateConfig(config: FileVaultConfig): void {
  const { error } = validationSchema.validate(config);

  if(error) {
    throw new Error(`[FileVault Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): FileVaultConfig {
  const config: FileVaultConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  }

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
