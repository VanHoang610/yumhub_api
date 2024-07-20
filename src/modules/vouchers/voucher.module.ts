import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Voucher, VoucherSchema } from "src/schemas/voucher.schema";
import { VoucherService } from "./voucher.service";
import { VoucherController } from "./voucher.controller";
import { TypeOfVoucher, TypeOfVoucherSchema } from "src/schemas/typeOfVoucher.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Voucher.name,
                schema: VoucherSchema
            },
            {
                name: TypeOfVoucher.name,
                schema: TypeOfVoucherSchema
            }
        ])
    ],
    providers: [VoucherService],
    controllers: [VoucherController]
})

export class VoucherModule { };