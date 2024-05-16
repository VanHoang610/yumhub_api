import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Ads, AdsSChema } from "src/schemas/ads.schema";
import { AdsService } from "./ads.service";
import { AdsController } from "./ads.controller";
import { Merchant, MerchantSchema } from "src/schemas/merchant.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Ads.name,
                schema: AdsSChema,
            },
            {
                name: Merchant.name,
                schema: MerchantSchema
            }
        ])
    ],
    providers: [AdsService],
    controllers: [AdsController]
})
export class AdsModule {}