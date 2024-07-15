import { Controller, Post } from '@nestjs/common';
import { ZalopayService } from './zalopay.service';

@Controller('zalopay')
export class ZalopayController {
  constructor(private readonly zalopayService: ZalopayService) {}

  @Post('order')
  async createOrder(): Promise<string> {
    return await this.zalopayService.createOrder();
  }
}
