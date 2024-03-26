import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shipper } from "./shipper.schema";
import { TransactionTypeShipper } from "./transantionTypeShipper.schame";

@Schema()
export class OrderStatus {

    @Prop({required: true})
    name: string
}

export const OrderStatusSchemas = SchemaFactory.createForClass(OrderStatus);