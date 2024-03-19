import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { User } from "./user.schemas";
@Schema()
export class Shipper {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) // Thêm ref và sửa kiểu dữ liệu
    userID?: User;
    
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

    @Prop({required: false})
    modeCode?: string

    @Prop({required: false})
    idBike?: string

    @Prop({required: false, default: true})
    active?: boolean

}

export const ShipperSchema = SchemaFactory.createForClass(Shipper)