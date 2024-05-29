import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fee } from 'src/schemas/fee.schema';


@Injectable()
export class FeeService {
    constructor(@InjectModel(Fee.name) private feeModal: Model<Fee>) {}
}