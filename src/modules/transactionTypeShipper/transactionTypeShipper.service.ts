import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionTypeShipper } from 'src/schemas/transantionTypeShipper.schame';
@Injectable()
export class TransactionTypeShipperService {

    constructor(@InjectModel(TransactionTypeShipper.name) private typeShipperModel: Model<TransactionTypeShipper>) {}

    async addData() {
        try {
            const addData = await this.typeShipperModel.create([
                {
                    _id: "661b693bfc13ae5701ab8a15",
                    name: "topUp"
                },
                {
                    _id: "661b693bfc13ae5701ab8a16",
                    name: "cashOut"
                }
            ])
            return { result: true, TypeShipper: addData}
        } catch (error) {
            return { result: false, TypeShipper: error}
        }
    }
}