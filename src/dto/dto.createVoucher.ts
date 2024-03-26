import { IsNumber, IsString } from "class-validator";

export class CreateVoucherDto {

    @IsString()
    startDate: string

    @IsString()
    endDate: string

    @IsString()
    nameVoucher: string

    @IsString()
    discountAmount: string

    @IsNumber()
    typeOfVoucher: number

    @IsString()
    code: string

    @IsNumber()
    status: number

}