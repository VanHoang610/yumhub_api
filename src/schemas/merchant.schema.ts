import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now } from "mongoose";
import { TypeOfMerchant } from "./typeOfMerchant.schema";

@Schema()
export class Merchant {
    
    @Prop({required: true})
    name: string
    
    @Prop({required: true})
    address: string

    @Prop({required: false, default: Date.now})
    joinDay?: Date

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TypeOfMerchant'})  //1: chay, 2: mặn
    type?: TypeOfMerchant

    @Prop({required: false})
    openTime?: string

    @Prop({required: false})
    closeTime?: string

    @Prop({required: false})
    rating?: number

    @Prop({required: false, default: false})
    deleted?: boolean 
    
    @Prop({required: false}) //kinh độ
    longitude: number 

    @Prop({required: false}) // vĩ độ
    latitude: number

    @Prop({required: false})
    imageBackground: string

    @Prop({required: false, default: 1})
    status?: number

    @Prop({required: false, default: 0})
    balance?: number

    @Prop({required: false})
    hotline?: string

}

export const MerchantSchema = SchemaFactory.createForClass(Merchant)