import { BaseMongoRepository } from '@project/libs/shared/core';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class RefreshTokenRepository extends BaseMongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    private readonly refreshTokenModel: Model<RefreshTokenModel>
  ) {
    super(refreshTokenModel, RefreshTokenEntity.fromObject);
  }
  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity> {
    const document = await this.refreshTokenModel
      .findOne({ tokenId })
      .exec();

    return this.createEntityFromDocument(document);
  }


  public async deleteByTokenId(tokenId: string): Promise<void> {
    await this.refreshTokenModel
      .deleteOne({ tokenId })
      .exec();
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.refreshTokenModel.deleteMany({
      expiresIn: {$lt: new Date( )}
    }).exec()
  }
}
