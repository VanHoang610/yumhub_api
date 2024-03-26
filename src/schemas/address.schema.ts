import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Customer } from "./customer.schemas";
import mongoose from "mongoose";


@Schema()
export class Address {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
    customerID?: Customer;

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
    
    @Prop({required: false}) //kinh độ
    longitude: number

    @Prop({required: false}) //vĩ độ
    latitude: number

}

export const AddressSchema = SchemaFactory.createForClass(Address);