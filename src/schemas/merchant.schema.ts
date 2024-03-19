import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Merchant {
    
    @Prop({required: true})
    name: string
    
    @Prop({required: true})
    address: string

    @Prop({required: false})  //1: chay, 2: mặn
    type?: number

    @Prop({required: false})
    openTime?: string

    @Prop({required: false})
    closeTime?: string

    @Prop({required: false})
    rating?: string

    @Prop({required: false})
    businessLicense?: string

    @Prop({required: false, default: false})
    deleted?: boolean 
    
    @Prop({required: true}) //kinh độ
    longitude: number 

    @Prop({required: true}) // vĩ độ
    latitude: number

}

export const MerchantSchema = SchemaFactory.createForClass(Merchant)