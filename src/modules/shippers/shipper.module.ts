import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Shipper, ShipperSchema } from "src/schemas/shipper.schema";
import { ShipperController } from "./shipper.controller";
import { ShipperService } from "./shipper.service";

import { Order, OrderSchema } from "src/schemas/order.schema";
import { ResetPassword, ResetPasswordSchema } from "src/schemas/resetPass.schema";
import { OrderStatus, OrderStatusSchemas } from "src/schemas/orderStatus.schema";



@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Shipper.name,
                schema: ShipperSchema
            },
            {
                name: Order.name,
                schema: OrderSchema

            },
            {
                name: ResetPassword.name,
                schema: ResetPasswordSchema

            },
            {
                name: OrderStatus.name,
                schema: OrderStatusSchemas,
               },
        ]),
    ],
    controllers: [ShipperController],
    providers: [ShipperService]
})
export class ShipperModule { };