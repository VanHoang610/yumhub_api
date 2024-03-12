import { IsOptional, IsString } from "class-validator";
import { Shipper } from "src/schemas/shipper.schema";

export class DocumentDto {

    @IsOptional()
    shipperID: Shipper

    @IsString()
    documentTypeID: number

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    imageFontSide: string

    @IsString()
    imageBackSide: string

    @IsString()
    dateOfIssue: string

    @IsString()
    exprirationDate: string
}