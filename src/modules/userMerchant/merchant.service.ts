import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/merchant.schema';
import { UserMerchant } from 'src/schemas/userMerchant.schema';

@Injectable()
export class UserMerchantService {

    constructor(@InjectModel(UserMerchant.name) private userMerchants: Model<UserMerchant>) {}
}