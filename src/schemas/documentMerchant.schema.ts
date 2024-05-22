import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Merchant } from "./merchant.schema";


@Schema()
export class DocumentMerchant {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID?: Merchant

    @Prop()
    image: string

}

export const DocumentMerchantSchema = SchemaFactory.createForClass(DocumentMerchant)