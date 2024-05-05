import { Body, Controller, Post, Get, HttpException, HttpStatus, Param, ValidationPipe, UseGuards, Query } from '@nestjs/common'
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/dto.order';
import { UpdateOrderDto } from 'src/dto/dto.updateOrder';
import { AuthGuard } from 'src/helper/auth.middleware';
import { retry } from 'rxjs';
import { log } from 'console';
import { query } from 'express';

@Controller('orders')
export class OrderController {

    constructor(private readonly orderServices: OrderService) { }

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
    async setStatus(@Query('id') orderId: string, @Query('status') status: number) {
        return await this.orderServices.setStatus(orderId, status);
    }

    //lấy tất cả order
    @Get('getAllOrder')
    @UseGuards(AuthGuard)
    getAllOrder() {
        try {
            return this.orderServices.getAllOrder();
        } catch (error) {
            return error
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
            return error
        }
    }
    @Get('RevenueYumhub')
    @UseGuards(AuthGuard)
    getRevenueTime(@Body() body: { month: string }) {
        try {
            const { month } = body
            const totalRevenue = this.orderServices.revenueMonth(month);
            if (!totalRevenue) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return totalRevenue;
        } catch (error) {
            return error
        }
    }

    // updateOrder
    @Post('updateOrder')
    @UseGuards(AuthGuard)
    updateOrder(@Query('id') id: string, @Body() update: UpdateOrderDto) {
        try {
            return this.orderServices.updateOrder(id, update);
        } catch (error) {
            return error
        }
    }

    //hiển thị đơn hàng cho shipper 
    @Post('getOrderByShipperAndStatus')
    getOrderByShipperAndStatus(@Body() orderDto: OrderDto) {
        try {
            return this.orderServices.getOrderByShipperAndStatus(orderDto)
        } catch (error) {
            return error
        }
    }
    @Get('historyReviewShipper/:id')
    @UseGuards(AuthGuard)
    historyReviewShipper(@Param('id') id: string) {
        try {
            return this.orderServices.shipperReview(id);
        } catch (error) {
            return error
        }
    }
}