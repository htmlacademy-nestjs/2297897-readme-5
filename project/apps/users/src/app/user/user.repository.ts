import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { BaseMongoRepository } from '@project/libs/shared/core';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(userModel, UserEntity.fromObject)
  }
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }
}
