//lấy dữ liệu client

import { MinLength, IsNotEmpty, IsNumber, IsInt, isString, IsString, IsOptional, IsEmpty } from "class-validator"; // kiểm tra validate
export class CustomerDto {

    @IsOptional()
    @IsString({})
    fullName?: string;

    @IsOptional()
    @IsString()
    avatar?: string

    @IsOptional()
    @IsString()
    sex?: string

    @IsOptional()
    @IsString()
    birthDay?: string

    @IsOptional()
    @IsString()
    joinDay?: string

    @IsOptional()
    @IsString()
    rating?: string

    @IsEmpty()
    @IsString()
    phoneNumber: string

    @IsEmpty()
    @IsString()
    password: string

    @IsEmpty()
    @IsString()
    email: string
};
