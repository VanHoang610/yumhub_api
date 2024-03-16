import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Customer } from "./customer.schemas";
import { Merchant } from "./merchant.schema";
import { Shipper } from "./shipper.schema";
import { Voucher } from "./voucher";


@Schema()
export class Order {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
    customerID: Customer

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID: Merchant

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'})
    shipperID: Shipper

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Voucher'})
    voucherID: Voucher

    @Prop({required: false}) //
    deliveryAddress?: string

    @Prop({required: true}) //
    priceFood: number

    @Prop({required: true}) //
    deliveryCost: number

    @Prop({required: true})
    totalPaid: number //

    @Prop({required: false})
    timeBook?: string

    @Prop({required: false, default: Date.now})
    dateBook?: Date

    @Prop({required: true})
    timeGetFood: string  //

    @Prop({required: true}) 
    timeGiveFood: string //

    @Prop({required: false})
    totalDistance?: string

    @Prop({required: true})   //1: đã thanh toán, 2:đã hủy, 3: đang giao
    status: number //

    @Prop({required: false})
    imageGetFood?: string

    @Prop({required: false})
    imageGiveFood?: string

}

export const OrderSchema = SchemaFactory.createForClass(Order)