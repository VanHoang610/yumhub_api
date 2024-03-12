import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Order.name,
                schema: OrderSchema
            }
        ])
    ]
})

export class OrderModule { };