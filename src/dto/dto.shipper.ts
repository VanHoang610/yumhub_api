import { IsBoolean, IsOptional, IsString } from "class-validator";
import { User } from "src/schemas/user.schemas";

export class ShipperDto {

    @IsOptional()
    userID?: User

    @IsOptional()
    @IsString()
    avatar?: string

    @IsString()
    @IsOptional()
    fullName?: string

    @IsOptional()
    @IsString()
    rating?: string

    @IsOptional()
    @IsString()
    sex?: string

    @IsOptional()
    @IsString()
    birthDay?: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsString()
    brandBike?: string

    @IsOptional()
    @IsString()
    modeCode?: string

    @IsOptional()
    @IsString()
    idBike?: string

    @IsOptional()
    @IsBoolean()
    active?: boolean
}
