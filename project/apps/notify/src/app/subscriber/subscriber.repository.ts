import { BaseMongoRepository } from '@project/libs/shared/core';
import { EmailSubscriberEntity } from './subscriber.entity';
import { EmailSubscriberModel } from './subscriber.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class EmailSubscriberRepository extends BaseMongoRepository<EmailSubscriberEntity, EmailSubscriberModel> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) emailSubscriberModel: Model<EmailSubscriberModel>
  ) {
    super(emailSubscriberModel, EmailSubscriberEntity.fromObject)
  }

  public async findById(email: string): Promise<EmailSubscriberEntity> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }
}
