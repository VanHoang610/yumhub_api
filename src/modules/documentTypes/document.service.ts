import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentTypeShipper } from 'src/schemas/documentTypeShipper.schema';

@Injectable()
export class DocumentTypeService {

    constructor(@InjectModel(DocumentTypeShipper.name) private documentTypeServices: Model<DocumentTypeShipper> ) {}
}