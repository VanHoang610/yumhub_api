import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { UserMerchant, UserMerchantSchema } from "src/schemas/userMerchant.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserMerchant.name,
                schema: UserMerchantSchema
            }
        ])
    ]
})

export class UserMerchantModule { };