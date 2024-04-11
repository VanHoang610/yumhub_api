import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderStatus, OrderStatusSchemas } from "src/schemas/orderStatus.schema";
import { OrderStatusController } from "./orderStatus.controller";
import { OrderStatusService } from "./orderStatus.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: OrderStatus.name,
                schema: OrderStatusSchemas
            }
        ])
    ],
    controllers: [OrderStatusController],
    providers: [OrderStatusService]
})
export class OrderStatusModule { };