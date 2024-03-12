import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schemas";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Customer, CustomerSchema } from "src/schemas/customer.schemas";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule { };