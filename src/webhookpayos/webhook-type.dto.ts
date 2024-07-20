import { IsString } from 'class-validator';
import { WebhookDataDto } from './webhook-data.dto';

export class WebhookTypeDto {
    @IsString()
    desc: string;

    @IsString()
    code: string;  
             
    data: WebhookDataDto;
    
    @IsString()
    signature: string; 
}