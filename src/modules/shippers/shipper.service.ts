import { Injectable }  from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipper } from 'src/schemas/shipper.schema';

@Injectable()
export class ShipperService {

    constructor(@InjectModel(Shipper.name) private shippers: Model<Shipper>) {}
}
