
import { Controller } from '@nestjs/common'
import { DocumentShipperService } from './document.service';

@Controller('documentShipper')
export class DocumentShipperController {

    constructor(private readonly documentServices: DocumentShipperService) {}

    // // addData
    // @Get('addData')
    // async addData() {
    //     return await this.documentServices.addData();
    // }
}