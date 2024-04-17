import { Controller, Get } from "@nestjs/common";
import { TransactionTypeMerchantService } from "./typeMerchant.service";

@Controller('transactionTypeMerchant')
export class TransactionTypeMerchantController {
    constructor(private readonly typeMerchantService: TransactionTypeMerchantService) { }

    @Get('addData')
    addData() {
        return this.typeMerchantService.addData();
    }
}