import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupOfFood, groupOfFoodSchema } from "src/schemas/groupOfFood.schema";
import { FoodTypeController } from "./groupOfFood.controller";
import { foodTypeService } from "./groupOfFood.service";
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
    controllers: [FoodTypeController],
    providers: [foodTypeService]
})
export class GroupOfFoodModule { };