import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema()
export class OrderStatus {
    equals(_id: Types.ObjectId) {
        throw new Error('Method not implemented.');
    }

    @Prop({required: true})
    name: string
}

export const OrderStatusSchemas = SchemaFactory.createForClass(OrderStatus);