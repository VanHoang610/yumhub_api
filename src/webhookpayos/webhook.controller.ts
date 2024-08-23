import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { WebhookTypeDto } from './webhook-type.dto';
import { RealtimeGateway } from '../websocket/realtime.gateway';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  @Get()
  async testEndpoint(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('Webhook test endpoint working!');
  }

  @Post()
  async handleWebhook(@Body() payload: WebhookTypeDto, @Res() res: Response) {
    console.log('Nhận được webhook:', payload);

    const { code, desc, data, signature } = payload;

    if (data) {
      try {
        let type;
        if(data.description.slice(0,1)=="1"){
          type="customer"
        }else if(data.description.slice(0,1)=="2"){
          type="shipper"
        }else type="merchant"
        const client = this.realtimeGateway.findClientById(data.description.slice(-24), type);

        if (client) {
          this.realtimeGateway.sendMessageToClient(client.socket, "paymentQRCode", desc);
          console.log(`Đơn hàng ${data.orderCode} nhận được với số tiền ${data.amount}.`);
        } else {
          console.log(`Không tìm thấy client nào đang hoạt động với ID: ${data.description.slice(-24)} và loại: ${type}`);
        }
      } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu:', error);
      }
    } else {
      console.log('Không nhận được dữ liệu nào trong webhook.');
    }

    console.log(`Mã webhook: ${code}`);
    console.log(`Mô tả webhook: ${desc}`);
    console.log(`Chữ ký: ${signature}`);

    res.status(HttpStatus.OK).send('Webhook đã được nhận');
  }
}