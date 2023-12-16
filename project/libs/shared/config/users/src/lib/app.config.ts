import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

type ApplicationConfig = {
  environment: Environment,
  port: number,
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().required(),
})


function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config);
  if (error) {
    throw new Error(`[Applicaiton config Validation Error]: ${error.message}`)
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10),
  }

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
