import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TransactionTypeShipper {

    @Prop({required: true})
    name: string
}

export const TransactionTypeShipperSchema = SchemaFactory.createForClass(TransactionTypeShipper)