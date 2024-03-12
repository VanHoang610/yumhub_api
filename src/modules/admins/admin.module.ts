import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/schemas/admin.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Admin.name,
                schema: AdminSchema
            }
        ])
    ]
})

export class AdminModule { };