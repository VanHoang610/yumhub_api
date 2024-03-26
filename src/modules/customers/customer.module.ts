import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "src/schemas/customer.schemas";
import { CustomerController } from "./customer.controller";
import { CustomerServices } from "./customer.service";
import { User, UserSchema } from "src/schemas/user.schemas";
import { Order, OrderSchema } from "src/schemas/order.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Customer.name,
                schema: CustomerSchema
            },
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Order.name,
                schema: OrderSchema
            }
        ]),
    ],
    controllers: [CustomerController],
    providers: [CustomerServices]
})

export class CustomerModule { };