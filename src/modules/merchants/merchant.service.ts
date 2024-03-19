import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MerchantDto } from 'src/dto/dto.merchant';
import { Merchant } from 'src/schemas/merchant.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Order } from 'src/schemas/order.schema';


@Injectable()
export class MerchantService {

    constructor(@InjectModel(Merchant.name) private merchants: Model<Merchant>,
        @InjectModel(Order.name) private orderModel: Model<Order>) { }

    async createMerchant(merchant: MerchantDto) {
        const newMerchants = new this.merchants(merchant)
        await newMerchants.save()
        return { result: true, newMerchant: newMerchants }
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

    async getHistory(id: string) {
        try {
            const orders = await this.orderModel.find({ "merchantID": id });
            if (!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, historyShipper: orders }
        } catch (error) {
            return { result: false, historyShipper: error }
        }
    }

    async sortLocation(longitude: number, latitude: number) {
        try {
            const merchants = await this.merchants.find().exec();

            //tính quãng đường
            const sortedMerchants = merchants.map(merchant => {
                const distance = Math.sqrt(Math.pow(merchant.longitude - longitude, 2) + Math.pow(merchant.latitude - latitude, 2));
                return { ...merchant.toObject(), distance };
            });

            // Sắp xếp các nhà hàng theo khoảng cách tăng dần
            sortedMerchants.sort((a, b) => a.distance - b.distance);

            return { result: true, merchants: sortedMerchants };
        } catch (error) {
            return { result: false, merchants: error };
        }
    }
}