import { Controller } from "@nestjs/common";
import { FeeService } from "./fee.service";

@Controller('fee')

export class FeeController {
    constructor (private readonly feeService: FeeService) { }
}