import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Order } from "./order.schema";

@Schema()
export class Fee {

    @Prop({required: false})
    merchant: number

    @Prop({required: false})
    shipper: number
}

export const FeeSchema = SchemaFactory.createForClass(Fee)