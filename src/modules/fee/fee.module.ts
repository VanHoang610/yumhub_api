import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Fee, FeeSchema } from "src/schemas/fee.schema";
import { FeeController } from "./fee.controller";
import { FeeService } from "./fee.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Fee.name,
                schema: FeeSchema,
            }
        ]),
    ],
    controllers: [FeeController],
    providers: [FeeService]
})

export class FeeModule { };