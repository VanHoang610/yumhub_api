import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransferDto } from 'src/dto/dto.transfer';
import { Transfer } from 'src/schemas/transfer.schema';

@Injectable()
export class TransferService {

    constructor(@InjectModel(Transfer.name) private transfers: Model<Transfer>) {}
}