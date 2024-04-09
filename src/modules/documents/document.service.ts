import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from 'src/schemas/document.schemaShipper';

@Injectable()
export class DocumentService {

    constructor(@InjectModel(Document.name) private documentServices: Model<Document>) { }
}