import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from 'src/schemas/food.schema';

@Injectable()
export class FoodService {

    constructor(@InjectModel(Food.name) private FoodModel: Model<Food>) {}
}