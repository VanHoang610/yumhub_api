import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Merchant } from "./merchant.schema";


@Schema()
export class ReviewMerchant {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID?: Merchant

    @Prop({required: true})
    rating: string

    @Prop({required: false})
    description: string

    @Prop({required: false})
    image: string

}

export const ReviewMerchantSchema = SchemaFactory.createForClass(ReviewMerchant);