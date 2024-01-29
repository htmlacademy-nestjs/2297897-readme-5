import { registerAs } from '@nestjs/config';
import { Environment } from '@project/libs/shared/types';
import * as Joi from 'joi';

export interface NotifyConfig {
  environment: Environment;
  port: number;
  db: {
    host: string,
    port: number,
    user: string,
    name: string,
    password: string,
    authBase: string,
  };
  rabbit: {
    host: string,
    port: number,
    user: string,
    password: string,
    queue: string,
    exchange: string,
  };
}


const validationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().port().required(),
  db: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    user: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
  rabbit: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  })
});

function validateConfig(config: NotifyConfig) {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Notify Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      name: process.env.MONGO_DB,
      authBase: process.env.MONGO_AUTH_BASE,
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      port: parseInt(process.env.RABBIT_PORT, 10),
      user: process.env.RABBIT_USER,
      password: process.env.RABBIT_PASSWORD,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE,
    },
  };
  console.log(config);
  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
