//lấy dữ liệu client

import { MinLength, IsNotEmpty, IsNumber, IsInt, isString, IsString, IsOptional, IsEmpty } from "class-validator"; // kiểm tra validate
import { User } from "src/schemas/user.schemas";
export class CustomerDto {
    
    @IsOptional()
    userID?: User;
  
    // @MinLength(5, {message: 'Tên phải trên 5 kí tự'})
    @IsOptional()
    @IsString({})
    fullName?: string;

    @IsOptional()
    @IsString()
    avatar?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsString()
    sex?: string

    @IsOptional()
    @IsString()
    birthDay?: string

    @IsOptional()
    @IsString()
    joinDay?: string
};
