import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
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

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TransactionTypeMerchant'})
    transantionType: TransactionTypeMerchant

    @Prop({required: false, default: Date.now})
    time: Date

    @Prop({required: false, default: 2}) //2: thành công
    status: number
    
    @Prop({required: false}) 
    nameBank: string

    @Prop({required: false})
    numberBank: string

    @Prop({required: false})
    accountHolder: string
}

export const HistoryWalletMerchantSchemas = SchemaFactory.createForClass(HistoryWalletMerchant);