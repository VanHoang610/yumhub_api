import { Controller, Get } from "@nestjs/common";
import { TransactionTypeShipperService } from "./transactionTypeShipper.service";

@Controller('transactionTypeShipper')
export class TransactionTypeShipperController {
    constructor(private readonly typeShipperService: TransactionTypeShipperService) { }

    @Get('addData')
    addData() {
        return this.typeShipperService.addData();
    }
}