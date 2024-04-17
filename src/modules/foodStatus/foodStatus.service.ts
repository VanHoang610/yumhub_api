import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodStatus } from 'src/schemas/foodStatus.schema';

@Injectable()
export class FoodStatusService {
    constructor(@InjectModel(FoodStatus.name) private foodStatusModel: Model<FoodStatus>) {};

    async addData() {
        try {
            const createFoodStatus = await this.foodStatusModel.create([
                {
                    "_id": "661f9962fc13ae6967a24534",
                    "name": "processingFood"
                },
                {
                    "_id": "661f9962fc13ae6967a24535",
                    "name": "processingImage"
                },
                {
                    "_id": "661fb317ee3a326f69b55386",
                    "name": "onSale"
                },
                {
                    "_id": "661f9962fc13ae6967a24536",
                    "name": "outOfStock"
                },
                {
                    "_id": "661f9962fc13ae6967a24537",
                    "name": "deleted"
                }
            ])
            return { result: true, newFoodStatus: createFoodStatus }
        } catch (error) {
            return { result: false, order: error }
        }
    }
}