import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionTypeShipper, TransactionTypeShipperSchema } from "src/schemas/transantionTypeShipper.schame";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TransactionTypeShipper.name,
                schema: TransactionTypeShipperSchema
            }
        ])
    ]
})
export class TransactionTypeShipperModule { };