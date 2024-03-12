import { MinLength, IsNotEmpty, IsNumber, IsInt, IsString } from "class-validator"; // kiểm tra validate

export class UserDto {
    @IsNotEmpty({message: 'SDT không được để trống'}) // không được để trống
    phoneNumber: string;

    @MinLength(6, {message: 'Mật khẩu phải trên 6 kí tự'})
    password: string;

    @IsNumber()
    @IsInt({ message: 'ID Categories phải là số nguyên' })
    role: number

    @IsInt({ message: 'Balance phải là số' })
    balance?: number
}