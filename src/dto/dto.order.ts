import { IsNumber, IsOptional, IsString } from "class-validator";
import { Customer } from "src/schemas/customer.schemas";
import { Merchant } from "src/schemas/merchant.schema";
import { Shipper } from "src/schemas/shipper.schema";
import { Voucher } from "src/schemas/voucher.schema";

export class OrderDto {

    @IsOptional()
    customerID?: Customer

    @IsOptional()
    merchantID?: Merchant

    @IsOptional()
    shipperID?: Shipper

    @IsOptional()
    voucherID?: Voucher

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
    timeGetFood: string

    @IsString()
    timeGiveFood: string

    @IsString()
    totalDistance?: string

    @IsNumber()
    status: number

    @IsString()
    imageGetFood?: string
    
    @IsString()
    imageGiveFood?: string

}