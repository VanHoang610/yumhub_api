
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DetailOrder, DetailOrderSchema } from "src/schemas/detailOrder.schema";
import { Food, FoodSchema } from "src/schemas/food.schema";
import { Order, OrderSchema } from "src/schemas/order.schema";
import { DetailOrderService } from "./detailOrder.service";
import { DetailOrderController } from "./detailOrder.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: DetailOrder.name,
                schema: DetailOrderSchema,
            },
            {
                name: Order.name,
                schema: OrderSchema,
            },
            {
                name: Food.name,
                schema: FoodSchema,
            },
        ])
    ],
    providers: [DetailOrderService],
    controllers: [DetailOrderController]
})

export class DetailOrderModule { };