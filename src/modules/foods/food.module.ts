import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Food, FoodSchema } from 'src/schemas/food.schema';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Merchant, MerchantSchema } from 'src/schemas/merchant.schema';
import { TypeOfFood, typeOfFoodSchema } from 'src/schemas/typeOfFood.schema';
import { FoodStatus, FoodStatusSchemas } from 'src/schemas/foodStatus.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Food.name,
                schema: FoodSchema,
            },
            {
                name: Merchant.name,
                schema: MerchantSchema
            },
            {
                name: TypeOfFood.name,
                schema: typeOfFoodSchema
            },
            {
                name: FoodStatus.name,
                schema: FoodStatusSchemas
            },
        ])
    ],
    controllers: [FoodController],
    providers: [FoodService]
})

export class FoodModule { };