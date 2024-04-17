import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionTypeShipper, TransactionTypeShipperSchema } from "src/schemas/transantionTypeShipper.schame";
import { TransactionTypeShipperController } from "./transactionTypeShipper.controller";
import { TransactionTypeShipperService } from "./transactionTypeShipper.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TransactionTypeShipper.name,
                schema: TransactionTypeShipperSchema
            }
        ])
    ],
    controllers: [TransactionTypeShipperController],
    providers: [TransactionTypeShipperService]
})
export class TransactionTypeShipperModule { };