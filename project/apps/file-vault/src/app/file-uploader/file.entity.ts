import { Entity } from '@project/libs/shared/core';
import { File } from '@project/libs/shared/types';

export class FileEntity implements File, Entity<string, File> {
  public id?: string;
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt?: string;
  public updatedAt?: string;
  public subDirectory: string;


  public populate(data: File) {
    this.id = data.id;
    this.originalName = data.originalName;
    this.size = data.size;
    this.mimetype = data.mimetype;
    this.hashName = data.hashName;
    this.path = data.path;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.subDirectory = data.subDirectory;

    return this;
  }

  public serialize(): File {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subDirectory: this.subDirectory,
    }
  }

  static fromObject(data: File) {
    return new FileEntity()
      .populate(data);
  }
}
