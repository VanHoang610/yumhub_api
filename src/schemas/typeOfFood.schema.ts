import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TypeOfFood{
    @Prop({required: true})
    name: string

}
export const typeOfFoodSchema = SchemaFactory.createForClass(TypeOfFood)