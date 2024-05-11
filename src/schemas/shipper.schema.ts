import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
@Schema()
export class Shipper {

    @Prop({required: false})
    fullName: string

    @Prop({required: false})
    avatar?: string

    @Prop({required: false, default: Date.now})
    joinDay?: Date

    @Prop({required: false})
    rating?: number

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

    @Prop({required: false, default: 1}) 
    status?: number

    @Prop({required: false}) //kinh độ
    longitude: number

    @Prop({required: false}) //vĩ độ
    latitude: number

    @Prop({ unique: true, required: true })  
    phoneNumber: string

    @Prop({required: false})
    password: string

    @Prop({ unique: true, required: true }) 
    email: string

    @Prop({required: false, default: false}) 
    deleted?: boolean

    @Prop({required: false, default: 0})
    balance?: number
}

export const ShipperSchema = SchemaFactory.createForClass(Shipper)