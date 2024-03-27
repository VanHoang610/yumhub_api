import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOfMerchant, TypeOfMerchantSchema } from "src/schemas/typeOfMerchant.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TypeOfMerchant.name,
                schema: TypeOfMerchantSchema
            }
        ])
    ]
})
export class TypeOfMerchantModule { };