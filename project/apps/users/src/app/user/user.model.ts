import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/libs/shared/types';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true
})
export class UserModel extends Document implements AuthUser {
  @Prop({
    required: true
  })
  name: string;

  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true
  })
  avatarUrl?: string;

  @Prop({
    required: true
  })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
