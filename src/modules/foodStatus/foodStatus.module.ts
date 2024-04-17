import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FoodStatus, FoodStatusSchemas } from "src/schemas/foodStatus.schema";
import { FoodStatusService } from "./foodStatus.service";
import { FoodStatusController } from "./foodStatus.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FoodStatus.name,
                schema: FoodStatusSchemas
            }
        ])
    ],
    controllers: [FoodStatusController],
    providers: [FoodStatusService]
})
export class foodStatusModule { };