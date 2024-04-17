import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class FoodStatus {

    @Prop({required: true})
    name: string
}

export const FoodStatusSchemas = SchemaFactory.createForClass(FoodStatus);