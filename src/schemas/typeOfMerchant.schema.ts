import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TypeOfMerchant {
    @Prop({required: true})
    name: string
}

export const TypeOfMerchantSchema = SchemaFactory.createForClass(TypeOfMerchant)