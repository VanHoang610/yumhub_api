import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from 'src/schemas/document.schemaShipper';
import { DocumentMerchant } from 'src/schemas/documentMerchant.schema';

@Injectable()
export class DocumentMerchantService {

    constructor(@InjectModel(DocumentMerchant.name) private documentServices: Model<DocumentMerchant>) { }

    async addData() {
        try {
            const documentMerchant = await this.documentServices.create([{
                merchantID: "660c99c2fc13ae788b50fbdc",
                image: "https://giakezatec.com/wp-content/uploads/2022/08/mo-cua-hang-tap-hoa-can-giay-to-gi-3.jpg",
              }, {
                merchantID: "660c99c2fc13ae788b50fbdd",
                numberCard: "https://giakezatec.com/wp-content/uploads/2022/08/mo-cua-hang-tap-hoa-can-giay-to-gi-3.jpg",
              }, {
                merchantID: "660c99c2fc13ae788b50fbde",
                image: "https://giakezatec.com/wp-content/uploads/2022/08/mo-cua-hang-tap-hoa-can-giay-to-gi-3.jpg",
              }, {
                merchantID: "660c99c2fc13ae788b50fbdf",
                image: "https://giakezatec.com/wp-content/uploads/2022/08/mo-cua-hang-tap-hoa-can-giay-to-gi-3.jpg",
              }, {
                merchantID: "6623ba85e9633b12179cdeaa",
                image: "https://giakezatec.com/wp-content/uploads/2022/08/mo-cua-hang-tap-hoa-can-giay-to-gi-3.jpg",
              }])
            return { result: true, documentMerchant: documentMerchant }
        } catch (error) {
            return { result: false, documentMerchant: error }
        }
    }
}