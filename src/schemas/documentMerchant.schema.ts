import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Merchant } from './merchant.schema';
import { DocumentType } from './documentType.schema';

@Schema()
export class DocumentMerchant {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' })
  merchantID?: Merchant;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DocumentType' })
  documentTypeID: DocumentType;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  imageFontSide: string;

  @Prop({ required: true })
  imageBackSide: string;

  @Prop({ required: false })
  dateOfIssue: string;

  @Prop({ required: false })
  exprirationDate: string;
}

export const DocumentMerchantSchema =
  SchemaFactory.createForClass(DocumentMerchant);
