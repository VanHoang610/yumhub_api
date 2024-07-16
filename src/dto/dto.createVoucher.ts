import { IsNumber, IsOptional, IsString } from "class-validator";
import { TypeOfVoucher } from "src/schemas/typeOfVoucher.schema";

export class CreateVoucherDto {

    @IsString()
    startDate: string

    @IsString()
    endDate: string

    @IsString()
    nameVoucher: string

    @IsString()
    discountAmount: string

    @IsOptional()
    typeOfVoucherID?: TypeOfVoucher

    @IsString()
    code: string

    @IsNumber()
    conditionsApply: number

}