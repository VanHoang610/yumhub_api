import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shipper } from "./shipper.schema";


@Schema()
export class Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'})
    shipperID?: Shipper

    @Prop({required: true})
    documentTypeID: number

    @Prop({required: false})
    description?: string
    
    @Prop({required: true})
    imageFontSide: string

    @Prop({required: true})
    imageBackSide: string

    @Prop({required: true})
    dateOfIssue: string

    @Prop({required: true})
    exprirationDate: string

}

export const DocumentSchema = SchemaFactory.createForClass(Document)