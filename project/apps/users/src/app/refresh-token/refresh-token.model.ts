import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseToken } from '@project/libs/shared/types';
import { Document } from 'mongoose';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true,
})
export class RefreshTokenModel extends Document implements BaseToken {
  @Prop({
    required: true,
  })
  tokenId: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  expiresIn: Date;

  @Prop()
  createdAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);
