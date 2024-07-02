import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { WebhookDataDto } from './webhook-data.dto';

@Controller('webhook')
export class WebhookController {
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

    // Xử lý dữ liệu webhook ở đây
    console.log(`Order ${orderCode} received with amount ${amount}.`);

    // Thêm logic xử lý dữ liệu từ webhook theo yêu cầu của bạn

    res.status(HttpStatus.OK).send('Webhook received');
  }
}
