import { registerAs } from '@nestjs/config';
import { Environment } from '@project/libs/shared/types';
import * as Joi from 'joi';

export interface ApiGatewayConfig {
  environment: Environment,
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required,
  port: Joi.number().port().required(),
});

function validateConfig(config: ApiGatewayConfig) {
  const {error} = validationSchema.validate(config);

  if(error) {
    throw new Error(`[ApiGateway Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApiGatewayConfig {
  const config: ApiGatewayConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10),
  }

  validateConfig(config);

  return config;
}

export default registerAs('application', getConfig);
