import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatus } from 'src/schemas/orderStatus.schema';
import { TypeOfFood } from 'src/schemas/typeOfFood.schema';

@Injectable()
export class foodTypeService {
    constructor(@InjectModel(TypeOfFood.name) private typeFoodModel: Model<TypeOfFood>) {};

    async addData() {
        try {
            const createType = await this.typeFoodModel.create([
                {
                    "_id": "661760e3fc13ae3574ab8fde",
                    "name": "Water"
                },
                {
                    "_id": "661760e3fc13ae3574ab8cde",
                    "name": "Rice"
                },
                {
                    "_id": "661760e3fc13ae3574ab87df",
                    "name": "fried chicken"
                },
                {
                    "_id": "661760e3fc13ae3574abrde0",
                    "name": "vegetarian food"
                },
                {
                    "_id": "661760e3fc13ae3574a23de1",
                    "name": "sweet soup"
                },
                {
                    "_id": "661760e3fc13ae1274ab8de2",
                    "name": "Phở"
                },
                {
                    "_id": "661760e45c13ae3574ab8de3",
                    "name": "Bún bò"
                },
                {
                    "_id": "661761a5fc13ae3po7ab89f5",
                    "name": "Hủ tiếu"
                }
            ])
            return { result: true, newType: createType }
        } catch (error) {
            return { result: false, newType: error }
        }
    }
}