import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderStatus, OrderStatusSchemas } from "src/schemas/orderStatus.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: OrderStatus.name,
                schema: OrderStatusSchemas
            }
        ])
    ]
})
export class OrderStatusModule { };