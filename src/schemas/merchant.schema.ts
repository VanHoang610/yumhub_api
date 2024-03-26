import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TypeOfMerchant } from "./typeOfMerchant.schema";

@Schema()
export class Merchant {
    
    @Prop({required: true})
    name: string
    
    @Prop({required: true})
    address: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TypeOfMerchant'})  //1: chay, 2: mặn
    type?: TypeOfMerchant

    @Prop({required: false})
    openTime?: string

    @Prop({required: false})
    closeTime?: string

    @Prop({required: false})
    rating?: number

    @Prop({required: false}) //giấy phép
    businessLicense?: string

    @Prop({required: false, default: false})
    deleted?: boolean 
    
    @Prop({required: true}) //kinh độ
    longitude: number 

    @Prop({required: true}) // vĩ độ
    latitude: number

}

export const MerchantSchema = SchemaFactory.createForClass(Merchant)