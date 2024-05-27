import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupOfFood, groupOfFoodSchema } from "src/schemas/groupOfFood.schema";
import { GroupOfFoodController } from "./groupOfFood.controller";
import { GroupOfFoodService } from "./groupOfFood.service";
import { Food, FoodSchema } from "src/schemas/food.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: GroupOfFood.name,
                schema: groupOfFoodSchema
            },
            {
                name: Food.name,
                schema: FoodSchema
            }
        ])
    ],
    controllers: [GroupOfFoodController],
    providers: [GroupOfFoodService]
})
export class GroupOfFoodModule { };