import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewCustomer } from 'src/schemas/reviewCustomer.schema';

@Injectable()
export class ReviewCustomerService {

    constructor (@InjectModel(ReviewCustomer.name) private reviewCustomer: Model<ReviewCustomer>) {}
}