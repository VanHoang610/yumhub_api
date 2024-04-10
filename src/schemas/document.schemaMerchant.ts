import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shipper } from "./shipper.schema";
import { Merchant } from "./merchant.schema";


@Schema()
export class Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID?: Merchant

    @Prop({required: true})
    image: string

}

export const DocumentSchema = SchemaFactory.createForClass(Document)