import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TransactionTypeMerchant {

    @Prop({required: true})
    name: string
}

export const TransactionTypeMerchantSchema = SchemaFactory.createForClass(TransactionTypeMerchant)