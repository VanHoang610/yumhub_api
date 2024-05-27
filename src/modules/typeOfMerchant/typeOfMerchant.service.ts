import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Merchant } from "src/schemas/merchant.schema";
import { TypeOfMerchant } from "src/schemas/typeOfMerchant.schema";

@Injectable()
export class TypeOfMerchantService {
    constructor(@InjectModel(TypeOfMerchant.name) private typeMerchantModel: Model<TypeOfMerchant>,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>) {}

    async getCategory(name: string) {
        const type = await this.typeMerchantModel.findOne({ name: name });
        const category = await this.merchantModel.find({type:type._id}).exec();
        return { result: true, category: category};
    }
}