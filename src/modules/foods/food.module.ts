import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Food, FoodSchema } from 'src/schemas/food.schema';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Merchant, MerchantSchema } from 'src/schemas/merchant.schema';
import { FoodStatus, FoodStatusSchemas } from 'src/schemas/foodStatus.schema';
import { GroupOfFood, groupOfFoodSchema } from 'src/schemas/groupOfFood.schema';
import { UserMerchant, UserMerchantSchema } from 'src/schemas/userMerchant.schema';

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
                name: GroupOfFood.name,
                schema: groupOfFoodSchema
            },
            {
                name: FoodStatus.name,
                schema: FoodStatusSchemas
            },
            {
                name: UserMerchant.name,
                schema: UserMerchantSchema
            },
        ])
    ],
    controllers: [FoodController],
    providers: [FoodService]
})

export class FoodModule { };