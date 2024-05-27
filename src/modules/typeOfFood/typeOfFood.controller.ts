import { Controller, Get, Post, Query } from "@nestjs/common";
import { foodTypeService } from "./typeOfFood.service";

@Controller('foodType')
export class FoodTypeController {
    constructor(private readonly foodTypeServices: foodTypeService) { }


    // addData
    @Post('addData')
    async addData() {
        return await this.foodTypeServices.addData();
    }

    @Get('food')
    async typeFood(@Query('name') name: string) {
        return await this.foodTypeServices.typeFood(name);
    }
}
