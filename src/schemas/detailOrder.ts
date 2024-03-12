import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Order } from "./order.schema";
import { Food } from "./food.schema";

@Schema()
export class DetailOrder {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order'})
    orderID?: Order

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food'})
    foodID?: Food

    @Prop({required: true})
    quantity: number

    @Prop({required: true})
    price: number

    @Prop({required:false})
    description?: string
}

export const DetailOrderSchema = SchemaFactory.createForClass(DetailOrder)