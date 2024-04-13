import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Order } from "./order.schema";
import { TypeOfReview } from "./typeOfReview.shema";

@Schema()
export class Review {


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order'})
    orderID: Order

    @Prop({required: false})
    description?: string

    @Prop({required: true})
    rating: number
    
    @Prop({type: mongoose.Types.ObjectId, ref: 'TypeOfReview'})
    typeOfReview: TypeOfReview

    @Prop({required: false, default: Date.now})
    creatAt?: Date
}

export const ReviewSchema = SchemaFactory.createForClass(Review)