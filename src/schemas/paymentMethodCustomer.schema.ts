import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { Shipper } from "./shipper.schema";
import { Customer } from "./customer.schemas";


@Schema()
export class PaymentMethodCustomer {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
    customerID: Customer
    
    @Prop({required: true})
    numberCard: string

    @Prop({required: true})
    nameInCard: string

    @Prop({required: true})
    exprirationDate: string

    @Prop({required: true})
    cvv: string
}

export const PaymentMethodCustomerSchema = SchemaFactory.createForClass(PaymentMethodCustomer)