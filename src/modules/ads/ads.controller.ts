import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdsService } from "./ads.service";
import { AdsDto } from "src/dto/dto.ads";

@Controller('ads')
export class AdsController {
    constructor(private readonly adsService: AdsService) { }
    @Post("create")
    async createAds(@Body() ads: AdsDto) {
        
        return await this.adsService.createAds(ads);
    }
    @Get("all")
    async getAllAds() {
        return await this.adsService.getAllAds();
    }
}