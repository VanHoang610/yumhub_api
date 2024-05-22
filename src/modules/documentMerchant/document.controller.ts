import { Controller, Get } from '@nestjs/common'
import { DocumentMerchantService } from './document.service';

@Controller('documentMerchant')
export class DocumentMerchantController {

    constructor(private readonly documentServices: DocumentMerchantService) {}

    // addData
    @Get('addData')
    async addData() {
        return await this.documentServices.addData();
    }
}