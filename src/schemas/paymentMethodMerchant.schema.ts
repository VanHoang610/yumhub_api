import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { User } from "./user.schemas";
import { Shipper } from "./shipper.schema";
import { Merchant } from "./merchant.schema";


@Schema()
export class PaymentMethodMerchant {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID?: Merchant
    
    @Prop({required: true})
    numberCard: string

    @Prop({required: true})
    nameInCard: string

    @Prop({required: true})
    exprirationDate: string

    @Prop({required: true})
    cvv: string
}

export const PaymentMethodMerchantSchema = SchemaFactory.createForClass(PaymentMethodMerchant)