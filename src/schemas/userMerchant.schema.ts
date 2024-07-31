import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Merchant } from "./merchant.schema";

@Schema()
export class UserMerchant {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' }) // Thêm ref và sửa kiểu dữ liệu
    merchantID?: Merchant;
    
    @Prop({required: false, default: 1})  //1: admin, 2: employee, 3: manager
    role?: number

    @Prop({required: false})
    fullName?: string

    @Prop({required: false})
    sex?: string

    @Prop({required: false})
    avatar?: string

    @Prop({ unique: true, required: true }) 
    phoneNumber: string
    
    @Prop({required: false})
    password: string

    @Prop({ unique: true }) 
    email: string

    @Prop({ required: false, default: false }) 
    deleted: boolean
}

export const UserMerchantSchema = SchemaFactory.createForClass(UserMerchant)