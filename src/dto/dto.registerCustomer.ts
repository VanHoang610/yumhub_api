import { IsNotEmpty, IsString } from "class-validator";

export class RegisterCustomerDto {

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string 
}