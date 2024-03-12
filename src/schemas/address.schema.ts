import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Customer } from "./customer.schemas";
import mongoose from "mongoose";


@Schema()
export class Address {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
    CustomerID?: Customer;

    @Prop({required: true})
    city: string;

    @Prop({required: true})
    district: string;

    @Prop({required: true})
    ward: string;

    @Prop({required: true})
    street: string;

    @Prop({required: true})
    houseNumber: string;

}

export const AddressSchema = SchemaFactory.createForClass(Address);