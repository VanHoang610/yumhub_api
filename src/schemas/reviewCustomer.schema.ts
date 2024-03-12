import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Customer } from "./customer.schemas";


@Schema()
export class ReviewCustomer {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
    customerID?: Customer

    @Prop({required: true})
    rating: string

    @Prop({required: false})
    description?: string

    @Prop({required: false})
    image?: string

}

export const ReviewCustomerSchema = SchemaFactory.createForClass(ReviewCustomer);