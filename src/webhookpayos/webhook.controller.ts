import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { WebhookTypeDto } from './webhook-type.dto';

@Controller('webhook')
export class WebhookController {

  @Get()
  async testEndpoint(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('Webhook test endpoint working!');
  }

  @Post()
  async handleWebhook(@Body() payload: WebhookTypeDto, @Res() res: Response) {
    console.log('Received webhook:', payload);

    const {
      code,
      desc,
      data,
      signature
    } = payload;

    // Ensure data exists and has the necessary properties
    if (data) {
      console.log(`Order ${data.orderCode} received with amount ${data.amount}.`);
    } else {
      console.log('No data received in the webhook.');
    }

    console.log(`Webhook code: ${code}`);
    console.log(`Webhook description: ${desc}`);
    console.log(`Signature: ${signature}`);

    res.status(HttpStatus.OK).send('Webhook received');
  }
}
