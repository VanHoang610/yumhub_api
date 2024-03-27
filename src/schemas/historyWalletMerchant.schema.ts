import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shipper } from "./shipper.schema";
import { Merchant } from "./merchant.schema";
import { TransactionTypeMerchant } from "./transactionTypeMerchant.schema";

@Schema()
export class HistoryWalletMerchant {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'})
    merchantID: Merchant

    @Prop({required: true})
    amountTransantion: number

    @Prop({required: false})
    description: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TransantionTypeMerchant'})
    transantionType: TransactionTypeMerchant

    @Prop({required: false, default: Date.now})
    time: Date

    @Prop({required: true})
    balance: number
}

export const HistoryWalletMerchantSchemas = SchemaFactory.createForClass(HistoryWalletMerchant);