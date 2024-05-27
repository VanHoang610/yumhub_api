import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TypeOfMerchant {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    image: string
}

export const TypeOfMerchantSchema = SchemaFactory.createForClass(TypeOfMerchant)