import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Voucher, VoucherSchema } from "src/schemas/voucher";
import { VoucherService } from "./voucher.service";
import { VoucherController } from "./voucher.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Voucher.name,
                schema: VoucherSchema
            }
        ])
    ],
    providers: [VoucherService],
    controllers: [VoucherController]
})

export class VoucherModule { };