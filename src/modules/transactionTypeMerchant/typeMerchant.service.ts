import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/merchant.schema';
import { TransactionTypeMerchant } from 'src/schemas/transactionTypeMerchant.schema';
import { UserMerchant } from 'src/schemas/userMerchant.schema';

@Injectable()
export class TransactionTypeMerchantService {

    constructor(@InjectModel(TransactionTypeMerchant.name) private typeMerchantModel: Model<TransactionTypeMerchant>) {}

    async addData() {
        try {
            const addData = await this.typeMerchantModel.create([
                {
                    _id: "661b693bfc13ae5701ab8a13",
                    name: "topUp"
                },
                {
                    _id: "661b693bfc13ae5701ab8a14",
                    name: "cashOut"
                }
            ])
            return { result: true, TypeMerchant: addData}
        } catch (error) {
            return { result: false, TypeMerchant: error}
        }
    }
}