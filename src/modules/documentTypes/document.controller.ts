import { Controller } from "@nestjs/common"
import { DocumentTypeService } from "./document.service";

@Controller()
export class DocumentTypeController {

    constructor(private readonly documentTypeServices: DocumentTypeService) { }
}