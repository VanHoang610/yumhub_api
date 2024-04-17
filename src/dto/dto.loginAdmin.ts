import { MinLength, IsNotEmpty, IsNumber, IsInt, IsString, IsOptional, IsEmpty } from "class-validator"; // kiểm tra validate

export class LoginAdminDto {

    @IsNotEmpty({message: 'UserName không được để trống'}) // không được để trống
    userName: string;

    @IsNotEmpty({message: 'Pass không được để trống'})
    password: string;
    

}