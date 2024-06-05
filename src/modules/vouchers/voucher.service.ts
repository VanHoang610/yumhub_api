import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVoucherDto } from "src/dto/dto.createVoucher";
import { Voucher } from "src/schemas/voucher.schema";

@Injectable()
export class VoucherService {

    constructor(@InjectModel(Voucher.name) private voucherModel: Model<Voucher>) { }

    async addData() {
        try {
            const newVoucher = await this.voucherModel.create([
                {
                    _id: "660c9b03fc13ae76f950fb06",
                    startDate: "1/14/2024",
                    endDate: "6/13/2023",
                    nameVoucher: "RAPAFLO",
                    discountAmount: 36,
                    typeOfVoucherID: "6604e57e81084710d45efe93", 
                    code: "52544-152",
                    expiry: false,
                    conditionsApply: 2
                }, {
                    _id: "660c9b03fc13ae76f950fb0e",
                    startDate: "9/2/2023",
                    endDate: "9/8/2023",
                    nameVoucher: "Methadone Hydrochloride",
                    discountAmount: 64,
                    typeOfVoucherID: "6604e57e81084710d45efe93",
                    code: "0406-1510",
                    expiry: true,
                    conditionsApply: 1
                }, {
                    _id: "660c9b03fc13ae76f950fb0c",
                    startDate: "4/15/2023",
                    endDate: "4/14/2023",
                    nameVoucher: "Denti-Care Denti-Freeze",
                    discountAmount: 25,
                    typeOfVoucherID: "6604e57e81084710d45efe95",
                    code: "64778-0399",
                    expiry: false,
                    conditionsApply: 3
                }, {
                    _id: "660c9b03fc13ae76f950fb0a",
                    startDate: "1/18/2024",
                    endDate: "2/24/2024",
                    nameVoucher: "Ringers",
                    discountAmount: 49,
                    typeOfVoucherID: "Hourstan",
                    code: "0264-2202",
                    expiry: true,
                    conditionsApply: 1
                }, {
                    _id: "660c9b03fc13ae76f950fb08",
                    startDate: "12/9/2023",
                    endDate: "8/13/2023",
                    nameVoucher: "Bronchitone",
                    discountAmount: 25,
                    typeOfVoucherID: "6604e57e81084710d45efe96",
                    code: "57520-0411",
                    expiry: false,
                    conditionsApply: 3
                }
            ])
            return { result: true, newVoucher: newVoucher }
        } catch (error) {
            return { result: false, newVoucher: error }
        }
    }

    async createVoucher(voucherDto: CreateVoucherDto) {
        try {
            const code = await this.voucherModel.findOne({ code: voucherDto.code });
            if (code) return "Mã đã tồn tại";
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