import { DefaultPOJOType, Entity } from '@project/libs/shared/core';
import { BaseToken } from '@project/libs/shared/types';

export class RefreshTokenEntity implements Entity<string>, BaseToken {
  public id?: string;
  public createdAt: Date;
  public expiresIn: Date;
  public tokenId: string
  public userId: string;

  public populate(entity: BaseToken) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
    this.tokenId = entity.tokenId;
    this.userId = entity.userId;

    return this;
  }

  public serialize() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
      tokenId: this.tokenId,
      userId: this.userId,
    }
  }

  static fromObject(document: BaseToken): RefreshTokenEntity {
    return new RefreshTokenEntity()
      .populate(document);
  }
}
