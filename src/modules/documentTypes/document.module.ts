import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { DocumentType, DocumentTypeSchema } from "src/schemas/documentTypeShipper.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: DocumentType.name,
                schema: DocumentTypeSchema
            }
        ])
    ]
})

export class DocumentTypeModule { };