import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from 'src/schemas/food.schema';
import { OrderStatus } from 'src/schemas/orderStatus.schema';
import { TypeOfFood } from 'src/schemas/typeOfFood.schema';

@Injectable()
export class foodTypeService {
    constructor(@InjectModel(TypeOfFood.name) private typeFoodModel: Model<TypeOfFood>,
    @InjectModel(Food.name) private foodModel: Model<Food>,) {};

    async addData() {
        try {
            const createType = await this.typeFoodModel.create([
                {
                    
                    "name": "Water",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-water-bottle-and-drink-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    
                    "name": "Rice",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-rice-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    
                    "name": "fried chicken",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-fried-chicken-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    "name": "vegetarian food",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-vegetarian-food-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    
                    "name": "sweet soup",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-sweet-soup-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    
                    "name": "Phở",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-pho-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    
                    "name": "Bún bò",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-bun-flatart-icons-lineal-color-flatarticons.png"
                },
                {
                    
                    "name": "Hủ tiếu",
                    "img": "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-hot-dog-flatart-icons-lineal-color-flatarticons.png"
                }
            ])
            return { result: true, newType: createType }
        } catch (error) {
            return { result: false, newType: error }
        }
    }
    async typeFood(name: string){
        try {
            const typeFood = await this.typeFoodModel.findOne({name: name});
            const food = await this.foodModel.find({typeOfFood:typeFood._id}).exec();
            
            return { result: true, food: food }
        } catch (error) {
            return { result: false, typeFood: error }
        }
    }
}