import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Merchant } from "./merchant.schema";
import mongoose from "mongoose";

@Schema()
export class Ads {
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID: Merchant;

    @Prop({required: true})
    image: string;

    @Prop({required: true})
    title: string;
}

export const AdsSChema = SchemaFactory.createForClass(Ads)