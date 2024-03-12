import { Controller } from '@nestjs/common'
import { ShipperService } from './shipper.service';


@Controller()
export class ShipperController {

    constructor(private readonly shipperService: ShipperService) {}
}