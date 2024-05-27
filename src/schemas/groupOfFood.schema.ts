import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Merchant } from "./merchant.schema";
import mongoose from "mongoose";

@Schema()
export class GroupOfFood{
    @Prop({required: true})
    name: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID: Merchant
}
export const groupOfFoodSchema = SchemaFactory.createForClass(GroupOfFood)