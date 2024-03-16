import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Merchant } from "./merchant.schema";


@Schema()
export class Food {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID?: Merchant

    @Prop({required: false})
    image?: string
    
    @Prop({required: true})
    nameFood: string

    @Prop({required: true})
    price: number

    @Prop({required: false}) //1: thức ăn, 2: nước uống
    type?: number  
}   

export const FoodSchema = SchemaFactory.createForClass(Food)