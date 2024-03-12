import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/merchant.schema';

@Injectable()
export class MerchantService {

    constructor (@InjectModel(Merchant.name) private merchants: Model<Merchant>) {}

    
}