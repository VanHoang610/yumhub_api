import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentType } from 'src/schemas/documentType.schema';

@Injectable()
export class DocumentTypeService {

    constructor(@InjectModel(DocumentType.name) private documentTypeServices: Model<DocumentTypeService> ) {}
}