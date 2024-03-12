import { Injectable } from "@nestjs/common/decorators/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReviewMerchant } from "src/schemas/reviewMerchant.schema";

@Injectable()
export class ReviewMerchantService {
    
    constructor(@InjectModel(ReviewMerchant.name) private reivewMerchants: Model<ReviewMerchant>) {}
}