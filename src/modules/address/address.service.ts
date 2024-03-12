import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from 'src/schemas/address.schema';

@Injectable()
export class AddressService {

    constructor(@InjectModel(Address.name) private address: Model<Address>) {}
}