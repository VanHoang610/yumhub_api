import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schemas";
import { Order } from "./order.schema";

@Schema()
export class Review {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    reviewerID?: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userID?: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    orderID?: Order

    @Prop({required: false})
    description?: string

    @Prop({required: true})
    rating: string
}

export const ReviewSchema = SchemaFactory.createForClass(Review)