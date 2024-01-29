import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './subscriber.model';
import { EmailSubscriberRepository } from './subscriber.repository';
import { EmailSubscriberService } from './subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: EmailSubscriberModel.name, schema: EmailSubscriberSchema
    }])
  ],
  providers: [EmailSubscriberRepository, EmailSubscriberService]
})
export class EmailSubscriberModule { }
