import { IsNumber, IsOptional, IsString } from "class-validator"
import { User } from "src/schemas/user.schemas"


export class TransferDto {

    @IsOptional()
    fromUserID?: User

    @IsOptional()
    toUserID?: User

    @IsOptional()
    @IsString()
    date?: string

    @IsNumber()
    amountTransfer: number

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsNumber()
    transantionType?: number

}
