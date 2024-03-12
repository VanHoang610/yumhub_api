import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Merchant } from "./merchant.schema";
import { User } from "./user.schemas";

@Schema()
export class UserMerchant {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' }) // Thêm ref và sửa kiểu dữ liệu
    merchantID?: Merchant;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userID?: User
    
    @Prop({required: false})
    role?: string

    @Prop({required: false})
    fullName?: string

    @Prop({required: false})
    sex?: string

}

export const UserMerchantSchema = SchemaFactory.createForClass(UserMerchant)