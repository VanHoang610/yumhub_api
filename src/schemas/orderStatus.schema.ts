import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class OrderStatus {

    @Prop({required: true})
    name: string
}

export const OrderStatusSchemas = SchemaFactory.createForClass(OrderStatus);