import { MinLength, IsNotEmpty, IsNumber, IsInt, IsString, IsOptional, IsEmpty } from "class-validator"; // kiểm tra validate

export class LoginDto {

    @IsNotEmpty({message: 'SDT không được để trống'}) // không được để trống
    phoneNumber: string;

    @IsNotEmpty({message: 'Pass không được để trống'})
    password: string;

}