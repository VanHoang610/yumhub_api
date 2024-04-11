import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "src/schemas/customer.schemas";
import { CustomerController } from "./customer.controller";
import { CustomerServices } from "./customer.service";
import { Order, OrderSchema } from "src/schemas/order.schema";
import { ResetPassword, ResetPasswordSchema } from "src/schemas/resetPass.schema";
import { UserMerchant, UserMerchantSchema } from "src/schemas/userMerchant.schema";
import { Shipper, ShipperSchema } from "src/schemas/shipper.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Customer.name,
                schema: CustomerSchema
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
                name: UserMerchant.name,
                schema: UserMerchantSchema
            },
            {
                name: Shipper.name,
                schema: ShipperSchema
            }
        ]),
    ],
    controllers: [CustomerController],
    providers: [CustomerServices]
})

export class CustomerModule { };