import { DocumentShipper, DocumentShipperSchema } from '../../schemas/documentShipper.schema';
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentShipperController } from './document.controller';
import { DocumentShipperService } from './document.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: DocumentShipper.name,
                schema: DocumentShipperSchema,
            }
        ])
    ],
    controllers: [DocumentShipperController],
    providers: [DocumentShipperService]
})

export class DocumentShipperModule { };