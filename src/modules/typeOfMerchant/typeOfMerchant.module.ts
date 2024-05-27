import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOfMerchant, TypeOfMerchantSchema } from "src/schemas/typeOfMerchant.schema";
import { TypeOfMerchantService } from "./typeOfMerchant.service";
import { TypeOfMerchantController } from "./typeOfMerchant.controller";
import { Merchant, MerchantSchema } from "src/schemas/merchant.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TypeOfMerchant.name,
                schema: TypeOfMerchantSchema
            },
            {
                name: Merchant.name,
                schema: MerchantSchema
            },
        ])
    ],
    controllers: [TypeOfMerchantController],
    providers: [TypeOfMerchantService]
})
export class TypeOfMerchantModule { };