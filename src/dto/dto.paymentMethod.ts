import { IsEmpty, IsOptional, IsString } from "class-validator"
import { User } from "src/schemas/user.schemas"

export class PaymentMethodDto {

    @IsOptional()
    userID?: User

    @IsString()
    @IsEmpty()
    namePaymentMethod: string

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