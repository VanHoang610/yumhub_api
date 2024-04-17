import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOfFood, typeOfFoodSchema } from "src/schemas/typeOfFood.schema";
import { FoodTypeController } from "./typeOfFood.controller";
import { foodTypeService } from "./typeOfFood.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TypeOfFood.name,
                schema: typeOfFoodSchema
            }
        ])
    ],
    controllers: [FoodTypeController],
    providers: [foodTypeService]
})
export class TypeOfFoodModule { };