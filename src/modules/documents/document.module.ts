import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from 'src/schemas/documentShipper.schema';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Document.name,
                schema: DocumentSchema,
            }
        ])
    ],
    controllers: [DocumentController],
    providers: [DocumentService]
})

export class DocumentModule { };