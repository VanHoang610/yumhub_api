import { Controller } from '@nestjs/common'
import { DetailOrderService } from './detailOrder.service';

@Controller()

export class DetailOrderController {

    constructor(private readonly detailOrderService: DetailOrderService) { }
}