import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MerchantDto } from 'src/dto/dto.merchant';
import { Merchant } from 'src/schemas/merchant.schema';


@Injectable()
export class MerchantService {

    constructor(@InjectModel(Merchant.name) private merchants: Model<Merchant>) { }

    async createMerchant(merchant: MerchantDto) {


        const newMerchants = new this.merchants(merchant)
        return newMerchants.save();
    }
    getMerchantById(id: string) {
        return this.merchants.findById(id);
    }

    getMerchant() {
        return this.merchants.find();
    }



    async deleteMerchant(id: string) {
        try {
            const merchantById = await this.merchants.findById(id);
        
            const updateMerchantID = await this.merchants.findByIdAndUpdate(merchantById, { deleted: true }, { new: true })
            if (updateMerchantID) {
                return "Xóa thành công Merchant"
            } else {
                throw new Error("Không tìm thấy ID merchant")
            }
        } catch (error) {
            console.error('Error delete merchant:', error);
            throw error;
        }
    }

    async updateMerchant(id: string, updateMerchant: MerchantDto) {
        try {
            const merchantNew = await this.merchants.findByIdAndUpdate(id, updateMerchant, { new: true });
            return { MerchantNew: merchantNew }
        } catch (error) {
            console.error('Error updating merchant:', error);
            throw error;
        }
    }
   




}