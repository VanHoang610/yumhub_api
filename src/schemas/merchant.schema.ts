import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Merchant {
    

    @Prop({required: true})
    name: string
    
    @Prop({required: true})
    address: string

    @Prop({required: false})
    type?: string

    @Prop({required: false})
    openTime?: string

    @Prop({required: false})
    closeTime?: string

    @Prop({required: false})
    rating?: number

    @Prop({required: false})
    businessLicense?: string

    @Prop({required: false, default: false})
    deleted?: boolean 

}

export const MerchantSchema = SchemaFactory.createForClass(Merchant)