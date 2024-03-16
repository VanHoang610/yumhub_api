import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { User } from "./user.schemas";

@Schema()
export class Customer {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) // Thêm ref và sửa kiểu dữ liệu
    userID?: User;

    @Prop({required: false})
    fullName?: string
    
    @Prop({required: false})
    avatar?: string

    @Prop({required: false})
    sex?: string

    @Prop({required: false})
    birthDay?: string

    @Prop({required: false})
    joinDay?: string

    @Prop({required: false})
    rating?: string

}

export const CustomerSchema = SchemaFactory.createForClass(Customer)