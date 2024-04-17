import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/schemas/admin.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { ResetPassword, ResetPasswordSchema } from "src/schemas/resetPass.schema";

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
        ])
    ],
    controllers: [AdminController],
    providers: [AdminService]
})

export class AdminModule { };