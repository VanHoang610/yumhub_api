import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { DocumentTypeShipper, DocumentTypeShipperSchema,  } from "src/schemas/documentTypeShipper.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: DocumentTypeShipper.name,
                schema: DocumentTypeShipperSchema
            }
        ])
    ]
})

export class DocumentTypeModule { };