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
                    "name": "Water",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-water-bottle-and-drink-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "_id": "661760e3fc13ae3574ab8cde",
                    "name": "Rice",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-rice-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "_id": "661760e3fc13ae3574ab87df",
                    "name": "fried chicken",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-fried-chicken-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "_id": "661760e3fc13ae3574abrde0",
                    "name": "vegetarian food",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-vegetarian-food-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "_id": "661760e3fc13ae3574a23de1",
                    "name": "sweet soup",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-sweet-soup-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "_id": "661760e3fc13ae1274ab8de2",
                    "name": "Phở",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-pho-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "_id": "661760e45c13ae3574ab8de3",
                    "name": "Bún bò",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-bun-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "_id": "661761a5fc13ae3po7ab89f5",
                    "name": "Hủ tiếu",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-hot-dog-flatart-icons-lineal-color-flatarticons.png"
                }
            ])
            return { result: true, newType: createType }
        } catch (error) {
            return { result: false, newType: error }
        }
    }
}