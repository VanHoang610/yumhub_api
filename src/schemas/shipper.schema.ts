import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';

@Schema()
export class Shipper {

    @Prop({required: false})
    fullName: string

    @Prop({required: false})
    avatar?: string

    @Prop({required: false})
    rating?: string

    @Prop({required: false})
    sex?: string

    @Prop({required: false})
    birthDay?: string

    @Prop({required: false})
    address?: string
    
    @Prop({required: false})
    brandBike?: string

    @Prop({required: false}) //màu
    modeCode?: string

    @Prop({required: false}) 
    idBike?: string

    @Prop({required: false, default: true}) 
    active?: boolean

    @Prop({required: false}) //kinh độ
    longitude: number

    @Prop({required: false}) //vĩ độ
    latitude: number

    @Prop({required: true}) 
    phoneNumber: number

    @Prop({required: true})
    password: string

    @Prop({required: true}) 
    email: string

}

export const ShipperSchema = SchemaFactory.createForClass(Shipper)