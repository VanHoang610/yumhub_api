import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema() 
export class Voucher {

    @Prop({required: true})
    startDate: string

    @Prop({required: true})
    endDate: string

    @Prop({required: true})
    nameVoucher: string

    @Prop({required: false})
    discountAmount?: string

    @Prop({required: false})  //total: 1, ship: 2, fee: 3
    typeOfVoucher?: number

    @Prop({required: true})
    code: string

    @Prop({required: false}) // 1: còn hạn, 2: hết hạn
    status?: number
    
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher)