import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Address, AddressSchema } from "src/schemas/address.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Address.name,
                schema: AddressSchema,
            }
        ])
    ]
})

export class AddressModule { };