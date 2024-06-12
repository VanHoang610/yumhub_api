import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentType {

    @Prop({required: true})
    name: string
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType)