import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { File } from '@project/libs/shared/types';
import { Document } from 'mongoose';

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class FileModel extends Document implements File {
 @Prop({
    required: true
  })
  public originalName: string;

  @Prop({
    required: true
  })
  public size: number;

  @Prop({
    required: true
  })
  public mimetype: string;

  @Prop({
    required: true
  })
  public hashName: string;

  @Prop({
    required: true
  })
  public path: string;

  @Prop({
    required: true
  })
  public subDirectory: string;

  public id?: string;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);

FileSchema.virtual('id').get(function() {
  return this._id.toString();
});
