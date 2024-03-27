import { IsEmpty, IsOptional, IsString } from "class-validator"

export class PaymentMethodDto {

    @IsString()
    @IsEmpty()
    numberCard: string

    @IsString()
    @IsEmpty()
    nameInCard: string

    @IsString()
    @IsEmpty()
    exprirationDate: string

    @IsString()
    @IsEmpty()
    cvv: string
    
}