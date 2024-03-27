import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOfMerchant, TypeOfMerchantSchema } from "src/schemas/typeOfMerchant.schema";
import { TypeOfVoucher, TypeOfVoucherSchema } from "src/schemas/typeOfVoucher.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TypeOfVoucher.name,
                schema: TypeOfVoucherSchema
            }
        ])
    ]
})
export class TypeOfVoucherModule { };