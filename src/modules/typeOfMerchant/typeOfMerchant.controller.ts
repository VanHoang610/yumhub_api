import { Body, Controller, Get } from "@nestjs/common";
import { TypeOfMerchantService } from "./typeOfMerchant.service";

@Controller('typeOfMerchant')
export class TypeOfMerchantController {
    constructor(private readonly typeOfMerchantService: TypeOfMerchantService) { }

    @Get('category')
    getCategory(@Body() body: { name: string }) {
        const { name } = body
        return this.typeOfMerchantService.getCategory(name);
    }

    @Get('all')
    getAllCategory() {
        return this.typeOfMerchantService.getAllCategory();
    }
}