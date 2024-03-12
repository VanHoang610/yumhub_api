import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Customer } from "./customer.schemas";
import { Merchant } from "./merchant.schema";
import { Shipper } from "./shipper.schema";


@Schema()
export class Order {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
    customerID: Customer

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID: Merchant

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'})
    shipperID: Shipper

    @Prop({required: true})
    deliveryAddress: string

    @Prop({required: true})
    priceFood: number

    @Prop({required: true})
    deliveryCost: number

    @Prop({required: true})
    totalPaid: number

    @Prop({required: false})
    timeBook?: string

    @Prop({required: false})
    dateBook?: string

    @Prop({required: true})
    timeGetFood: string

    @Prop({required: true})
    timeGiveFood: string

    @Prop({required: false})
    totalDistance?: string

    @Prop({required: true})
    status: string

    @Prop({required: false})
    imageGetFood?: string

    @Prop({required: false})
    imageGiveFood?: string

}

export const OrderSchema = SchemaFactory.createForClass(Order)