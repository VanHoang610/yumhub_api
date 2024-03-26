import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TypeOfReview {

    @Prop({required: true})
    name: string
}

export const TypeOfReviewSchema = SchemaFactory.createForClass(TypeOfReview)