import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Shipper } from "./shipper.schema";


@Schema()
export class PaymentMethodShipper {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'})
    shipperID?: Shipper
    
    @Prop({required: true})
    numberCard: string

    @Prop({required: true})
    nameInCard: string

    @Prop({required: true})
    exprirationDate: string

    @Prop({required: true})
    cvv: string
}

export const PaymentMethodShipperSchema = SchemaFactory.createForClass(PaymentMethodShipper)