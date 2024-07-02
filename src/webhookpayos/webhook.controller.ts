import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { WebhookDataDto } from './webhook-data.dto';

@Controller('webhook')
export class WebhookController {

  @Get()
  async testEndpoint(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('Webhook test endpoint working!');
  }

  @Post()
  async handleWebhook(@Body() payload: WebhookDataDto, @Res() res: Response) {
    console.log('Received webhook:', payload);

    const {
      orderCode,
      amount,
      description,
      accountNumber,
      reference,
      transactionDateTime,
      currency,
      paymentLinkId,
      code,
      desc,
      counterAccountBankId,
      counterAccountBankName,
      counterAccountName,
      counterAccountNumber,
      virtualAccountName,
      virtualAccountNumber,
    } = payload;

    console.log(`Order ${orderCode} received with amount ${amount}.`);

    res.status(HttpStatus.OK).send('Webhook received');
  }
}
