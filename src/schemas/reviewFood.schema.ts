import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Food } from "./food.schema";

@Schema()
export class ReviewFood {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food'})
    foodID?: Food;

    @Prop({required: true})
    rating: string;

    @Prop({required: false})
    description?: string

    @Prop({required: true})
    image: string
}

export const ReviewFoodSchema = SchemaFactory.createForClass(ReviewFood)