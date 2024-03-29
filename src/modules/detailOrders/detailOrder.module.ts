
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DetailOrder, DetailOrderSchema } from "src/schemas/detailOrder.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: DetailOrder.name,
                schema: DetailOrderSchema,
            }
        ])
    ]
})

export class DetailOrderModule { };