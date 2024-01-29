import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './subscriber.repository';
import { EmailSubscriberEntity } from './subscriber.entity';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) { }

    public async addSubscriber(subscriber: CreateSubscriberDTO): Promise<EmailSubscriberEntity> {
      const existsSubscriber = await this.emailSubscriberRepository.findByEmail(subscriber.email);

      if(existsSubscriber) {
        return existsSubscriber;
      }

      return this.emailSubscriberRepository.save(
        new EmailSubscriberEntity()
          .populate(subscriber)
      );
    }
}
