import { Controller } from '@nestjs/common'
import { DocumentService } from './document.service';

@Controller()
export class DocumentController {

    constructor(private readonly documentServices: DocumentService) {}
}