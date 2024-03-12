import { IsNumber, IsOptional, IsString } from "class-validator";
import { Customer } from "src/schemas/customer.schemas";
import { Merchant } from "src/schemas/merchant.schema";
import { Shipper } from "src/schemas/shipper.schema";

export class OrderDto {

    @IsOptional()
    customerID?: Customer

    @IsOptional()
    merchantID?: Merchant

    @IsOptional()
    shipperID?: Shipper

    @IsString()
    deliveryAddress: string
    
    @IsNumber()
    priceFood: number

    @IsNumber()
    deliveryCost: number

    @IsNumber()
    totalPaid: number

    @IsString()
    timeBook?: string

    @IsString()
    dateBook?: string

    @IsString()
    timeGetFood: string

    @IsString()
    timeGiveFood: string

    @IsString()
    totalDistance?: string

    @IsString()
    status: string

    @IsString()
    imageGetFood?: string
    
    @IsString()
    imageGiveFood?: string

}