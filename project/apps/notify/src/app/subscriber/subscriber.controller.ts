import { Body, Controller } from '@nestjs/common';
import { EmailSubscriberService } from './subscriber.service';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/libs/shared/types';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) { }


  @RabbitSubscribe({
    exchange: RabbitRouting.Default,
    routingKey: RabbitRouting.AddSubscriber,
    queue: RabbitRouting.Default
  })
  public async create(subscriber: CreateSubscriberDTO) {
    this.emailSubscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
