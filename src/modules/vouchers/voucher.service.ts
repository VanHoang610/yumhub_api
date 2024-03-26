import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVoucherDto } from "src/dto/dto.createVoucher";
import { ShipperDto } from "src/dto/dto.shipper";
import { Voucher } from "src/schemas/voucher";

@Injectable()
export class VoucherService {
    
    constructor(@InjectModel(Voucher.name) private voucherModel: Model<Voucher>) {}

    async createVoucher(voucherDto : CreateVoucherDto) {
        try {
            const newVoucher = new this.voucherModel(voucherDto)
            await newVoucher.save();
            return true;
        } catch (error) {
            return false;
        }
    }
}