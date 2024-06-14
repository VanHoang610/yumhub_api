import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentTypeShipper {

    @Prop({required: true})
    name: string
}

export const DocumentTypeShipperSchema = SchemaFactory.createForClass(DocumentTypeShipper)