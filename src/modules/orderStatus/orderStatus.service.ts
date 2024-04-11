import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatus } from 'src/schemas/orderStatus.schema';

@Injectable()
export class OrderStatusService {
    constructor(@InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatus>) {};

    async addData() {
        try {
            const createOrderStatus = await this.orderStatusModel.create([
                {
                    "_id": "661760e3fc13ae3574ab8ddd",
                    "name": "pending"
                },
                {
                    "_id": "661760e3fc13ae3574ab8dde",
                    "name": "processing"
                },
                {
                    "_id": "661760e3fc13ae3574ab8ddf",
                    "name": "arrivedEatery"
                },
                {
                    "_id": "661760e3fc13ae3574ab8de0",
                    "name": "shipped"
                },
                {
                    "_id": "661760e3fc13ae3574ab8de1",
                    "name": "delivered"
                },
                {
                    "_id": "661760e3fc13ae3574ab8de2",
                    "name": "cancel"
                },
                {
                    "_id": "661760e3fc13ae3574ab8de3",
                    "name": "onHold"
                },
                {
                    "_id": "661761a5fc13ae3517ab89f5",
                    "name": "backordered"
                }
            ])
            return { result: true, newOrderStatus: createOrderStatus }
        } catch (error) {
            return { result: false, order: error }
        }
    }
}