import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { PostType } from '@project/libs/shared/types';


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

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}) {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function isPostType (value: unknown): asserts value is PostType {
  if(typeof value !== 'string' || !Object.values(PostType).includes(value as PostType)) {
    throw new TypeError(`${value} is not valid post type`);
  }
}
