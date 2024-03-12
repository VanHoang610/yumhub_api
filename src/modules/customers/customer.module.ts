import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "src/schemas/customer.schemas";
import { CustomerController } from "./customer.controller";
import { CustomerServices } from "./customer.service";
import { User, UserSchema } from "src/schemas/user.schemas";

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
            }
        ]),
    ],
    controllers: [CustomerController],
    providers: [CustomerServices]
})

export class CustomerModule { };