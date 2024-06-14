import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shipper } from "./shipper.schema";
import { DocumentTypeShipper } from "./documentTypeShipper.schema";

@Schema()
export class DocumentShipper {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'})
    shipperID?: Shipper

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DocumentType'})
    documentTypeID: DocumentTypeShipper

    @Prop({required: false})
    description?: string
    
    @Prop({required: true})
    imageFontSide: string

    @Prop({required: true})
    imageBackSide: string

    @Prop({required: false})
    dateOfIssue: string

    @Prop({required: false})
    exprirationDate: string

}

export const DocumentShipperSchema = SchemaFactory.createForClass(DocumentShipper)