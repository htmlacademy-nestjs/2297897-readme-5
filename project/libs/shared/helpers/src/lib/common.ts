import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { PostType } from '@project/libs/shared/types';

export type DateTimeUnit = 's' | 'h' | 'm' | 'y';
export type TimeAndUnit = { value: number, unit: DateTimeUnit };

export function fillDTO<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T

export function fillDTO<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[]

export function fillDTO<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
    ...options
  });
}

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }) {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function isPostType(value: unknown): asserts value is PostType {
  if (typeof value !== 'string' || !Object.values(PostType).includes(value as PostType)) {
    throw new TypeError(`${value} is not valid post type`);
  }
}

export function getRabbitMQConnectionString({ user, password, host, port }) {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if(isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`)
  }

  return { value, unit };
}
