import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TypeOfVoucher } from "./typeOfVoucher.schema";

@Schema() 
export class Voucher {

    @Prop({required: true})
    startDate: string

    @Prop({required: true})
    endDate: string

    @Prop({required: true})
    nameVoucher: string

    @Prop({required: true}) //số lượng
    discountAmount: number

    @Prop({type: mongoose.Types.ObjectId, ref: 'TypeOfVoucher'})  //total: 1, ship: 2, fee: 3
    typeOfVoucherID: TypeOfVoucher

    @Prop({required: true})
    code: string

    @Prop({required: false, default: false}) //hạn sử dụng
    expiry: boolean

    @Prop({required: false}) //điều kiện áp dụng
    conditionsApply?: number
    
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher)