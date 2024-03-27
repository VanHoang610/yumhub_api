import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HistoryWalletShipper, HistoryWalletShipperSchemas } from "src/schemas/historyWalletShipper.schma";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: HistoryWalletShipper.name,
                schema: HistoryWalletShipperSchemas
            }
        ])
    ]
})
export class HistoryWalletShipperModule { };