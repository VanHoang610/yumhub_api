import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/schemas/admin.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { ResetPassword, ResetPasswordSchema } from "src/schemas/resetPass.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Admin.name,
                schema: AdminSchema
            },
            {
                name: ResetPassword.name,
                schema: ResetPasswordSchema
            }
        ]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
    ],
    controllers: [AdminController],
    providers: [AdminService]
})

export class AdminModule { };