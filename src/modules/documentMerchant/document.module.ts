import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentMerchant, DocumentMerchantSchema } from 'src/schemas/documentMerchant.schema';
import { DocumentMerchantController } from './document.controller';
import { DocumentMerchantService } from './document.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: DocumentMerchant.name,
                schema: DocumentMerchantSchema,
            }
        ])
    ],
    controllers: [DocumentMerchantController],
    providers: [DocumentMerchantService]
})

export class DocumentModule { };