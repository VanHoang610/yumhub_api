import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { User } from "./user.schemas";


@Schema()
export class PaymentMethod {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userID?: User

    @Prop({required: true})
    namePaymentMethod: string
    
    @Prop({required: true})
    numberCard: string

    @Prop({required: true})
    nameInCard: string

    @Prop({required: true})
    exprirationDate: string

    @Prop({required: true})
    cvv: string
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod)