import { Controller } from '@nestjs/common'
import { TransferService } from './transfer.service';

@Controller('transfers')
export class TransferController {

    constructor(private readonly transferServicer: TransferService) {}
}