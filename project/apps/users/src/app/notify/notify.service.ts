import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import rabbitConfig from 'libs/shared/config/users/src/lib/rabbit.config';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/libs/shared/types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDTO) {
    return this.rabbitClient.publish<CreateSubscriberDTO>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto },
    )
  }
}
