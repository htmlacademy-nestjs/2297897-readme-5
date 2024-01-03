import { Tag } from "@project/libs/shared/types";
import { Entity } from '@project/libs/shared/core';

export class PostTagEntity implements Tag, Entity<string>{
  public id?: string;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Tag) {
    if (!data.title) {
      throw new Error('Tag title is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id ?? '';
    this.title = data.title;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  public serialize() {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
