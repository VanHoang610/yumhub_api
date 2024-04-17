import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Merchant } from "./merchant.schema";
import { FoodStatus } from "./foodStatus.schema";
import { TypeOfFood } from "./typeOfFood.schema";


@Schema()
export class Food {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID?: Merchant

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'FoodStatus'})  
    status: FoodStatus
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TypeOfFood'})  
    typeOfFood: TypeOfFood

    @Prop({required: false})
    image?: string
    
    @Prop({required: true})
    nameFood: string

    @Prop({required: true}) // giá niêm yết
    price: number

    @Prop({required: false}) // giá bán
    priceForSale?: number

   
}   

export const FoodSchema = SchemaFactory.createForClass(Food)