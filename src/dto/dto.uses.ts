import { MinLength, IsNotEmpty, IsNumber, IsInt, IsString, IsOptional } from "class-validator"; // kiểm tra validate

export class UserDto {

    @IsString()
    @IsNotEmpty({message: 'SDT không được để trống'}) // không được để trống
    phoneNumber: string;

    @IsString()
    @MinLength(6, {message: 'Mật khẩu phải trên 6 kí tự'})
    password: string;

    @IsNumber()
    @IsOptional()
    @IsInt({ message: 'Role phải là số nguyên' })  //1: customer, 2: merchant, 3: shipper
    role: number

    @IsOptional()
    @IsInt({ message: 'Balance phải là số' })
    balance?: number
}