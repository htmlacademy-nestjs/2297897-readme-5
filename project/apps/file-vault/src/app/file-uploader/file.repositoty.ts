import { BaseMongoRepository } from '@project/libs/shared/core';
import { FileEntity } from './file.entity';
import { FileModel } from './file.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository extends BaseMongoRepository<FileEntity, FileModel> {
  constructor(
    @InjectModel(FileModel.name) fileModel: Model<FileModel>,
  ) {
    super(fileModel, FileEntity.fromObject);
  }
}
