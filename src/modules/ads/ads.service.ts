import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdsDto } from "src/dto/dto.ads";
import { Ads } from "src/schemas/ads.schema";
import { Merchant } from "src/schemas/merchant.schema";
const { ObjectId } = require('mongodb');
@Injectable()
export class AdsService {
    constructor(
        @InjectModel(Ads.name) private adsModel: Model<Ads>,
        @InjectModel(Merchant.name) private merchantModule: Model<Merchant>
    ) { }
    async createAds(ads: AdsDto) {

        const { title, merchant, image } = ads;
        const merchantId = (await this.merchantModule.findById(merchant));
        if (!merchantId) throw new HttpException("Not Found MerchantID", HttpStatus.NOT_FOUND);
        const merchantObjectId = new ObjectId(merchantId._id);
        // Tạo đối tượng mới
        const newAds = new this.adsModel({
            title: title,
            merchantId: merchantObjectId,
            image: image
        });

        // Lưu đối tượng vào cơ sở dữ liệu
        const createdAds = await newAds.save();
        return { result: true, ads: createdAds };
    }
    async getAllAds() {
        try {
            // Lấy tất cả các quảng cáo từ cơ sở dữ liệu
            const ads = await this.adsModel.find().lean().exec();
    
            // Sử dụng Promise.all để lấy thông tin thương gia cho tất cả quảng cáo song song
            const adsWithMerchant = await Promise.all(
                ads.map(async (ad) => {
                    const merchant = await this.merchantModule.findById(ad.merchantID).lean().exec();
                    return { ...ad, merchant }; // Không cần ._doc nếu sử dụng .lean()
                })
            );
    
            return { result: true, ads: adsWithMerchant };
        } catch (error) {
            console.error(error);
            return { result: false, message: 'Failed to fetch ads' };
        }
    }
}