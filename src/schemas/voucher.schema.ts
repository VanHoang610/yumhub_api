import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TypeOfVoucher } from "./typeOfVoucher.schema";

@Schema() 
export class Voucher {

    @Prop({required: true})
    startDate: Date

    @Prop({required: true})
    endDate: Date

    @Prop({required: true})
    nameVoucher: string

    @Prop({required: true}) //số lượng
    discountAmount: number

    @Prop({type: mongoose.Types.ObjectId, ref: 'TypeOfVoucher'})  //food: 1, ship: 2
    typeOfVoucherID: TypeOfVoucher

    @Prop({required: true, unique: true})
    code: string

    @Prop({required: false}) //điều kiện áp dụng
    conditionsApply?: number
    
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher)