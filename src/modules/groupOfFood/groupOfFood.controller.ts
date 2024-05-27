import { Controller, Post, Query } from "@nestjs/common";
import { foodTypeService } from "./groupOfFood.service";

@Controller('foodType')
export class FoodTypeController {
    constructor(private readonly foodTypeServices: foodTypeService) { }


    // addData
    @Post('addData')
    async addData() {
        return await this.foodTypeServices.addData();
    }

    
}