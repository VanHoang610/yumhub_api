import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';

@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderServices: Model<OrderService>) { }
}