import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MerchantDto } from 'src/dto/dto.merchant';
import { Merchant } from 'src/schemas/merchant.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Order } from 'src/schemas/order.schema';
import { Shipper } from 'src/schemas/shipper.schema';


@Injectable()
export class MerchantService {

    constructor(@InjectModel(Merchant.name) private merchants: Model<Merchant>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Shipper.name) private shipperModel: Model<Shipper>) { }

    async addData() {
        try {
            const newMerchants = await this.merchants.create([
                {
                    _id: "660c99c2fc13ae788b50fbdc",
                    name: "Neutrogena Men Age Fighter Face",
                    type: "6604e35881084710d45efe8c",
                    openTime: "2/13/2024",
                    closeTime: "6/17/2023",
                    rating: "4780644259",
                    address: "3 Mesta Parkway",
                    businessLicense: 4,
                    deleted: false,
                    longitude: -79.2056361,
                    latitude: 43.1508732,
                }, {
                    _id: "660c99c2fc13ae788b50fbe0",
                    name: "Acyclovir",
                    type: "6604e35881084710d45efe8c",
                    openTime: "11/4/2023",
                    closeTime: "9/15/2023",
                    rating: "5999573513",
                    address: "00 Algoma Trail",
                    businessLicense: 2,
                    deleted: false,
                    longitude: -78.69957,
                    latitude: 46.31681,
                }, {
                    _id: "660c99c2fc13ae788b50fbdf",
                    name: "Grippe",
                    type: "6604e35881084710d45efe8d",
                    openTime: "9/14/2023",
                    closeTime: "5/9/2023",
                    rating: "0797479198",
                    address: "57084 Onsgard Junction",
                    businessLicense: 2,
                    deleted: false,
                    longitude: 97.8503951,
                    latitude: 2.6928351,
                }, {
                    _id: "660c99c2fc13ae788b50fbde",
                    name: "ibuprofen",
                    type: "6604e35881084710d45efe8f",
                    openTime: "3/20/2024",
                    closeTime: "7/18/2023",
                    rating: "2935049756",
                    address: "586 Roth Street",
                    businessLicense: 4,
                    deleted: true,
                    longitude: 17.5275042,
                    latitude: 43.9760578,
                }, {
                    _id: "660c99c2fc13ae788b50fbdd",
                    name: "TRAMADOL HYDROCHLORIDE",
                    type: "6604e35881084710d45efe8e",
                    openTime: "1/1/2024",
                    closeTime: "9/22/2023",
                    rating: "1965644376",
                    address: "863 Summerview Way",
                    businessLicense: 3,
                    deleted: false,
                    longitude: 113.116527,
                    latitude: 26.12715,
                }]);
            return { result: true, newMerchant: newMerchants }
        } catch (error) {
            return { result: false, newMerchant: error }
        }
    }


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
            const orders = await this.orderModel.find({ merchantID: id }).sort({ timeBook: 1 });
            if (!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, history: orders }
        } catch (error) {
            return { result: false, historyShipper: error }
        }
    }


    async sortLocation(longitude: number, latitude: number) {
        try {
            const merchants = await this.merchants.find().exec();

            const sortedMerchants = merchants.map(merchant => {
                const distance = Math.sqrt(Math.pow(merchant.longitude - longitude, 2) + Math.pow(merchant.latitude - latitude, 2));
                return { ...merchant.toObject(), distance };
            });

            // sắp xếp
            sortedMerchants.sort((a, b) => a.distance - b.distance);

            return { result: true, merchants: sortedMerchants };
        } catch (error) {
            return { result: false, merchants: error };
        }
    }


    async get5NearestShippers(id: string) {
        try {
            const merchant = await this.merchants.findById(id).exec();
            const shipper = await this.shipperModel.find().exec();

            //tính quãng đường
            const sortShipper = shipper.map(shipper => {
                const distance = Math.sqrt(Math.pow(shipper.longitude - merchant.longitude, 2) + Math.pow(shipper.latitude - merchant.latitude, 2));
                return { ...shipper.toObject(), distance };
            });

            sortShipper.sort((a, b) => a.distance - b.distance);
            const nearestShippers = sortShipper.slice(0, 5);
            return { result: true, get5NearestShippers: nearestShippers }

        } catch (error) {
            return { result: false, get5NearestShippers: error }
        }
    }
}