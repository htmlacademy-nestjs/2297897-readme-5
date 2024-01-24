import * as Joi from 'joi';
import { Environment } from '@project/libs/shared/types';
import { registerAs } from '@nestjs/config';

export interface FileVaultConfig {
  environment: Environment,
  port: number,
  uploadDirectory: string,
}

const validationSchema = Joi.object({
  environment: Joi.string().required(),
  port: Joi.number().required(),
  uploadDirectory: Joi.string().required(),
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
  }

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
