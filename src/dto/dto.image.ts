import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ImageSchema } from "src/schemas/image.schema";
import { isBuffer } from "util";


export class imageDto {

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsNotEmpty()
    data: Buffer

    @IsString()
    contentType: string
}