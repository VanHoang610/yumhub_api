import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOfFood, typeOfFoodSchema } from "src/schemas/typeOfFood.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TypeOfFood.name,
                schema: typeOfFoodSchema
            }
        ])
    ]
})
export class TypeOfFoodModule { };