import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyConfigModule, getMongooseOptions } from '@project/libs/shared/config/notify';
import { EmailSubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
})
export class AppModule { }
