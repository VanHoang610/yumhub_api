import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HistoryWalletMerchant, HistoryWalletMerchantSchemas } from "src/schemas/historyWalletMerchant.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: HistoryWalletMerchant.name,
                schema: HistoryWalletMerchantSchemas
            }
        ])
    ]
})
export class HistoryWalletMerchantModule { };