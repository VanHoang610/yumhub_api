import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shipper } from "./shipper.schema";
import { TransactionTypeShipper } from "./transantionTypeShipper.schame";

@Schema()
export class HistoryWalletShipper {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'})
    shipperID: Shipper

    @Prop({required: true})
    amountTransantion: number

    @Prop({required: false})
    description: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'TransactionTypeShipper'})
    transantionType: TransactionTypeShipper

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

export const HistoryWalletShipperSchemas = SchemaFactory.createForClass(HistoryWalletShipper);