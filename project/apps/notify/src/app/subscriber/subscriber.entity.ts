import { Subscriber } from '@project/libs/shared/types';
import { Entity } from '@project/libs/shared/core';

export class EmailSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;
  public name: string;

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;

    return this;
  }

  public serialize() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    }
  }

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity()
      .populate(data);
  }
}
