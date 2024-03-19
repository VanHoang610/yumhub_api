import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Shipper, ShipperSchema } from "src/schemas/shipper.schema";
import { ShipperController } from "./shipper.controller";
import { ShipperService } from "./shipper.service";
import { User, UserSchema } from "src/schemas/user.schemas";


@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Shipper.name,
                schema: ShipperSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
    ],
    controllers: [ShipperController],
    providers: [ShipperService]
})
export class ShipperModule { };