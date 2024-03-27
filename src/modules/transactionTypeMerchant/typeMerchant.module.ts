import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionTypeMerchant, TransactionTypeMerchantSchema } from "src/schemas/transactionTypeMerchant.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TransactionTypeMerchant.name,
                schema: TransactionTypeMerchantSchema
            }
        ])
    ]
})
export class TransactionTypeMerchantModule { };