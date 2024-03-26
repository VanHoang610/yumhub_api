//lấy dữ liệu client

import { MinLength, IsNotEmpty, IsNumber, IsInt, isString, IsString, IsOptional, IsEmpty } from "class-validator"; // kiểm tra validate
import { User } from "src/schemas/user.schemas";
export class CustomerDto {
    

    @IsOptional()
    userID?: User;

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
};
