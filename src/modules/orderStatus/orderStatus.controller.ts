import { Controller, Get } from "@nestjs/common";
import { OrderStatusService } from "./orderStatus.service";

@Controller('orderStatus')
export class OrderStatusController {
    constructor(private readonly orderServices: OrderStatusService) { }


    // addData
    @Get('addData')
    async addData() {
        return await this.orderServices.addData();
    }

    
}
