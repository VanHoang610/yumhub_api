import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schemas";

@Schema()
export class Transfer {
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    fromUserID?: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    toUserID?: User

    @Prop({required: false})
    date?: string
    
    @Prop({required: false})
    amountTransfer: number

    @Prop({required: false})
    description?: string
    
    @Prop({required: false})
    transantionType?: number
    
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);