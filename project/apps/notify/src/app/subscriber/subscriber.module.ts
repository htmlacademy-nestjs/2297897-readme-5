import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './subscriber.model';
import { EmailSubscriberRepository } from './subscriber.repository';
import { EmailSubscriberService } from './subscriber.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/libs/shared/helpers';
import { EmailSubscriberController } from './subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: EmailSubscriberModel.name, schema: EmailSubscriberSchema
    }]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit'),
    )
  ],
  controllers: [EmailSubscriberController],
  providers: [
    EmailSubscriberRepository,
    EmailSubscriberService
  ],
})
export class EmailSubscriberModule { }
