import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionTypeMerchant, TransactionTypeMerchantSchema } from "src/schemas/transactionTypeMerchant.schema";
import { TransactionTypeMerchantController } from "./typeMerchant.controller";
import { TransactionTypeMerchantService } from "./typeMerchant.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TransactionTypeMerchant.name,
                schema: TransactionTypeMerchantSchema
            }
        ])
    ],
    controllers: [TransactionTypeMerchantController],
    providers: [TransactionTypeMerchantService]
})
export class TransactionTypeMerchantModule { };