import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schemas";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Customer, CustomerSchema } from "src/schemas/customer.schemas";
import { ResetPassword, ResetPasswordSchema } from "src/schemas/resetPass.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: ResetPassword.name,
                schema: ResetPasswordSchema
            }
        ]),
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule { };