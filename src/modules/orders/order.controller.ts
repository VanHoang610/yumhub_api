import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ValidationPipe,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/dto.order';
import { UpdateOrderDto } from 'src/dto/dto.updateOrder';
import { AuthGuard } from 'src/helper/auth.middleware';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderServices: OrderService) {}

  // addData
  @Get('addData')
  async addData() {
    return await this.orderServices.addData();
  }

  // tạo order
  @Post('createOrder')
  @UseGuards(AuthGuard)
  async createOrder(@Body() orderDto: OrderDto) {
    return await this.orderServices.createOrder(orderDto);
  }

  @Post('statusOrder')
  @UseGuards(AuthGuard)
  async setStatus(
    @Query('id') orderId: string,
    @Query('status') status: number,
  ) {
    return await this.orderServices.setStatus(orderId, status);
  }

  //lấy tất cả order
  @Get('getAllOrder')
  @UseGuards(AuthGuard)
  getAllOrder() {
    try {
      return this.orderServices.getAllOrder();
    } catch (error) {
      return error;
    }
  }

  //sắp xếp order tăng dần
  @Post('sortHistory')
  @UseGuards(AuthGuard)
  sortHistory(@Query('id') id: string, @Body() body: { who: number }) {
    const { who } = body;
    return this.orderServices.sortHistory(id, who);
  }

  // lấy order theo id
  @Get('getOrderById')
  @UseGuards(AuthGuard)
  getOrderById(@Query('id') id: string) {
    try {
      return this.orderServices.getOrderById(id);
    } catch (error) {
      return error;
    }
  }

  @Get('RevenueYumhub')
  @UseGuards(AuthGuard)
  getRevenueTime(@Body() body: { month: string }) {
    try {
      const { month } = body;
      const totalRevenue = this.orderServices.revenueMonth(month);
      if (!totalRevenue)
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return totalRevenue;
    } catch (error) {
      return error;
    }
  }

  // updateOrder
  @Post('updateOrder')
  @UseGuards(AuthGuard)
  updateOrder(@Query('id') id: string, @Body() update: UpdateOrderDto) {
    try {
      return this.orderServices.updateOrder(id, update);
    } catch (error) {
      return error;
    }
  }

  //hiển thị đơn hàng cho shipper
  @Post('getOrderByShipperAndStatus')
  getOrderByShipperAndStatus(@Body() orderDto: OrderDto) {
    try {
      return this.orderServices.getOrderByShipperAndStatus(orderDto);
    } catch (error) {
      return error;
    }
  }
  @Get('historyShipperIsReview')
  @UseGuards(AuthGuard)
  historyShipperIsReviewed(@Query('id') id: string) {
    try {
      return this.orderServices.shipperBeReview(id);
    } catch (error) {
      return error;
    }
  }

  @Get('historyShipperReview')
  @UseGuards(AuthGuard)
  historyShipperReview(@Query('id') id: string) {
    try {
      return this.orderServices.shipperReview(id);
    } catch (error) {
      return error;
    }
  }

  @Get('historyMerchantIsReview')
  @UseGuards(AuthGuard)
  historyMerchantIsReviewed(@Query('id') id: string) {
    try {
      return this.orderServices.merchantBeReview(id);
    } catch (error) {
      return error;
    }
  }
  @Get('historyCustomerIsReview')
  @UseGuards(AuthGuard)
  historyCustomerIsReview(@Query('id') id: string) {
    try {
      return this.orderServices.customerBeReview(id);
    } catch (error) {
      return error;
    }
  }
  @Get('historyCustomerReview')
  @UseGuards(AuthGuard)
  historyCustomerReview(@Query('id') id: string) {
    try {
      return this.orderServices.customerReview(id);
    } catch (error) {
      return error;
    }
  }
  @Delete('deleteOrder')
  @UseGuards(AuthGuard)
  deleteOrder(@Query('id') id: string) {
    try {
      return this.orderServices.deleteOrder(id);
    } catch (error) {
      return error;
    }
  }
  // @Get('revenueFoodDelivery2')
  // @UseGuards(AuthGuard)
  // revenueFoodDelivery2(@Query('month') month: string) {
  //     try {
  //         return this.orderServices.test(month);
  //     } catch (error) {
  //         return error
  //     }
  // }

  @Get('revenueFoodDelivery')
  @UseGuards(AuthGuard)
  revenueFoodDelivery(@Query('month') month: string) {
    try {
      return this.orderServices.revenueFoodAndDelivery(month);
    } catch (error) {
      return error;
    }
  }

  @Get('getAllOrderStatus')
  @UseGuards(AuthGuard)
  getAllOrderStatus() {
    try {
      return this.orderServices.getAllOrderStatus();
    } catch (error) {
      return error;
    }
  }

  @Get('searchOrder')
  @UseGuards(AuthGuard)
  searchOrder(@Query('key') key: string) {
    try {
      return this.orderServices.searchOrder(key);
    } catch (error) {
      return error;
    }
  }

  //lấy ra tất cả review của một order
  @Get('getReviewOfOrder')
  @UseGuards(AuthGuard)
  getReviewOfOrder(@Query('id') id: string) {
    return this.orderServices.getReviewOfOrder(id);
  }

  // lấy ra chi tiết order(tên món ăn, tổng số món,...)
  @Post('getListFoodByOrder')
  @UseGuards(AuthGuard)
  getListFoodByOrder(
    @Query('id') id: string,
    @Body() body: { status: number },
  ) {
    const { status } = body;
    return this.orderServices.getListFoodByOrder(id, status);
  }

  // update detailer
  @Post('updateDetailOrder')
  @UseGuards(AuthGuard)
  updateDetailOrder(
    @Query('id') id: string,
    @Body() body: { quantity: number },
  ) {
    const { quantity } = body;
    return this.orderServices.updateDetailOrder(id, quantity);
  }

  // lấy ra tất của review của một order
  @Get('listReviewByOrder')
  @UseGuards(AuthGuard)
  listReviewByOrder(
    @Query('id') id: string,
  ) {
    return this.orderServices.listReviewByOrder(id);
  }
}
