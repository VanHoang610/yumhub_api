import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class GroupOfFood{
    @Prop({required: true})
    name: string
}
export const groupOfFoodSchema = SchemaFactory.createForClass(GroupOfFood)