import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVoucherDto } from "src/dto/dto.createVoucher";
import { Voucher } from "src/schemas/voucher.schema";

@Injectable()
export class VoucherService {
    
    constructor(@InjectModel(Voucher.name) private voucherModel: Model<Voucher>) {}

    async createVoucher(voucherDto : CreateVoucherDto) {
        try {
            const newVoucher = new this.voucherModel(voucherDto)
            await newVoucher.save();
            return "thêm mới thành công";
        } catch (error) {
            return error;
        }
    }

    async getAllVoucher(){
        return this.voucherModel.find().exec(); 
    }
    async findValidVoucher(){
        return this.voucherModel.find({ endDate: { $gte: new Date() } }).exec(); // $gte viết tắt của "greater than or equal"
    }
    async updateVoucher(id: string, updateVoucher: CreateVoucherDto) {
        try {
            const voucherNew = await this.voucherModel.findByIdAndUpdate(id, updateVoucher, { new: true });
            return { voucher: voucherNew }
        } catch (error) {
            console.error('Error updating voucher:', error);
            throw error;
        }
    }
}