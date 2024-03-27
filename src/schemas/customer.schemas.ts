import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';

@Schema()
export class Customer {

    @Prop({required: false})
    fullName?: string
    
    @Prop({required: false})
    avatar?: string

    @Prop({required: false})
    sex?: string

    @Prop({required: false})
    birthDay?: string

    @Prop({required: false, default: Date.now})
    joinDay?: Date

    @Prop({required: false})
    rating?: string

    @Prop({required: true})
    phoneNumber: string

    @Prop({required: true})
    email: string

    @Prop({required: true})
    password: string

    @Prop({required: false, default: false})
    deleted: boolean

}

export const CustomerSchema = SchemaFactory.createForClass(Customer)