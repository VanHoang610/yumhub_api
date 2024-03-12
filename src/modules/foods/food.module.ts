import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Food, FoodSchema } from 'src/schemas/food.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Food.name,
                schema: FoodSchema,
            }
        ])
    ]
})

export class FoodModule { };