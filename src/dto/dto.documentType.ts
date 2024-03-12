import { IsEmpty } from "class-validator";

export class DocumentTypeDto {

    @IsEmpty()
    name: string
}