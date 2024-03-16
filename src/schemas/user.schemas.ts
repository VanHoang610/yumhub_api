import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, SchemaTypes } from 'mongoose';

@Schema()
export class User {

    @Prop({required: false, unique: true})
    email?: string;

    @Prop({required: false, unique: true})
    phoneNumber: string;

    @Prop({required: false})
    password: string;

    @Prop({required: false})  // 1: customer, 2: merchant, 3: shipper
    role: number;

    @Prop({required: false})
    balance?: string;

    @Prop({required: false, default: false})
    deleted?: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User)