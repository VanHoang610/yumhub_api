import { Module } from '@nestjs/common' 
import { MongooseModule } from '@nestjs/mongoose';
import { Transfer, TransferSchema } from 'src/schemas/transfer.schema';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Transfer.name,
                schema: TransferSchema,
            }
        ])
    ],
    controllers: [TransferController],
    providers: [TransferService]
})

export class TransferModule { }; 