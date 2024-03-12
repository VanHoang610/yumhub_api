import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Review } from "./review.schema";

@Schema()
export class ImageReview {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Review'})
    reviewID?: Review;

    @Prop({required: true})
    image: string
}

export const ImageReviewSchema = SchemaFactory.createForClass(ImageReview)