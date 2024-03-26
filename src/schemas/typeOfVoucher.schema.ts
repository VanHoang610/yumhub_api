import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TypeOfVoucher {

    @Prop({required: true})
    name: string
}

export const TypeOfVoucherSchema = SchemaFactory.createForClass(TypeOfVoucher)