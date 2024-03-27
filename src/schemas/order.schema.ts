import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Customer } from "./customer.schemas";
import { Merchant } from "./merchant.schema";
import { Shipper } from "./shipper.schema";

import { Voucher } from "./voucher";
import { OrderStatus } from "./orderStatus.schema";

import { Review } from "./review.schema";



@Schema()
export class Order {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
    customerID: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'})
    shipperID: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Voucher'})
    voucherID: Voucher

    @Prop({required: true}) 
    deliveryAddress: string

    @Prop({required: true}) 
    priceFood: number

    @Prop({required: true}) 
    deliveryCost: number

    @Prop({required: true})
    totalPaid: number 

    @Prop({required: false})
    timeBook?: Date

    @Prop({required: false})
    timeGetFood?: Date

    @Prop({required: false})
    timeGiveFood: Date 

    @Prop({required: false}) // quãng đường
    totalDistance?: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus'})   //1: đã thanh toán, 2:đã hủy, 3: đang giao
    status: OrderStatus 

    @Prop({required: false})
    imageGetFood?: string

    @Prop({required: false})
    imageGiveFood?: string

}

export const OrderSchema = SchemaFactory.createForClass(Order)