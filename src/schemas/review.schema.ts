import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schemas";
import { Order } from "./order.schema";

@Schema()
export class Review {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    orderID: Order

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) // người đánh giá
    reviewerID: User

    @Prop({required: false})
    description?: string

    @Prop({required: true})
    rating: number

    @Prop({required: false})  // 1: customer, 2: merchant, 3: shipper
    typeOfReview: number
}

export const ReviewSchema = SchemaFactory.createForClass(Review)