import { Body, Controller } from '@nestjs/common';
import { EmailSubscriberService } from './subscriber.service';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/libs/shared/types';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
  ) { }


  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income'
  })
  public async addSubscriber(subscriber: CreateSubscriberDTO) {
    return this.emailSubscriberService.addSubscriber(subscriber)
  }
}
