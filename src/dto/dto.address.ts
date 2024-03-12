import { IsEmpty, IsOptional, IsString } from "class-validator";
import { Customer } from "src/schemas/customer.schemas";

export class AddressDto {

    @IsOptional()
    customerID: Customer

    @IsEmpty()
    @IsOptional()
    @IsString()
    city: string

    @IsEmpty()
    @IsOptional()
    @IsString()
    district: string

    @IsEmpty()
    @IsOptional()
    @IsString()
    ward: string

    @IsEmpty()
    @IsOptional()
    @IsString()
    street: string

    @IsEmpty()
    @IsOptional()
    @IsString()
    houseNumber: string
}