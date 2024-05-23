import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOfFood, typeOfFoodSchema } from "src/schemas/typeOfFood.schema";
import { FoodTypeController } from "./typeOfFood.controller";
import { foodTypeService } from "./typeOfFood.service";
import { Food, FoodSchema } from "src/schemas/food.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TypeOfFood.name,
                schema: typeOfFoodSchema
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
export class TypeOfFoodModule { };