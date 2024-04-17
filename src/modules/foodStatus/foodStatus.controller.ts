import { Controller, Get, Post } from "@nestjs/common";
import { FoodStatusService } from "./foodStatus.service";


@Controller('foodStatus')
export class FoodStatusController {
    constructor(private readonly foodServices: FoodStatusService) { }


    // addData
    @Get('addData')
    async addData() {
        return await this.foodServices.addData();
    }
}