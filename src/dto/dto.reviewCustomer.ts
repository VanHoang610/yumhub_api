import { IsEmpty, IsOptional, IsString } from "class-validator";
import { Customer } from "src/schemas/customer.schemas";


export class ReviewCustomer {

    @IsOptional()
    customerID?: Customer

    @IsString()
    @IsEmpty()
    rating: string

    @IsString()
    description?: string

    @IsString()
    image?: string

}