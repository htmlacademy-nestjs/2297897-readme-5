import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { MongoConfiguration } from './mongo.env';
import { ConfigType } from '@nestjs/config';

export interface MongoDatabaseConfig {
  name: string,
  host: string,
  port: number,
  user: string,
  password: string,
  authBase: string,
}

async function getDatabaseConfig(): Promise<MongoConfiguration> {
  const config = plainToClass(MongoConfiguration, {
    name: process.env.MONGO_DB,
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  })

  await config.validate();
  return config;
}

export default registerAs('database', async (): Promise<ConfigType<typeof getDatabaseConfig>> => getDatabaseConfig());
