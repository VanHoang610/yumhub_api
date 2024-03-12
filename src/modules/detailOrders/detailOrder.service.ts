import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailOrder } from 'src/schemas/detailOrder';

@Injectable()
export class DetailOrderService {

    constructor(@InjectModel(DetailOrder.name) private detailOrderModel: Model<DetailOrder> ) { }
}