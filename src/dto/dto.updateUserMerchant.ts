//lấy dữ liệu client

import { MinLength, IsNotEmpty, IsNumber, IsInt, isString, IsString, IsOptional, IsEmpty } from "class-validator"; // kiểm tra validate
export class UpdateUserMerchantDto {
    
    @IsOptional()
    fullName?: string

    @IsOptional()
    sex?: string

    @IsOptional()
    avatar?: string

    @IsOptional()
    phoneNumber: string

    @IsOptional()
    email: string
};
