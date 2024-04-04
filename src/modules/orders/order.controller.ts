import { Body, Controller, Post, Get, HttpException, HttpStatus, Param, ValidationPipe } from '@nestjs/common'
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/dto.order';

@Controller('orders')
export class OrderController {

    constructor(private readonly orderServices: OrderService) { }

    // tạo order
    @Post('createOrder')
    async createOrder(@Body() orderDto: OrderDto) {
        return await this.orderServices.createOrder(orderDto);
    }

    @Post('statusprocessing/:id')
    async setStatusProcessing(@Param('id') orderId: string) {
        return await this.orderServices.setStatusProcessing(orderId);
    }
    @Post('statusshipped/:id')
    async setStatusShipped(@Param('id') orderId: string) {
        return await this.orderServices.setStatusShipped(orderId);
    }
    @Post('statusdelivered/:id')
    async setStatusDelivered(@Param('id') orderId: string) {
        return await this.orderServices.setStatusDelivered(orderId);
    }
    @Post('statuscancel/:id')
    async setStatusCancel(@Param('id') orderId: string) {
        return await this.orderServices.setStatusCancel(orderId);
    }
    @Post('statusonhold/:id')
    async setStatusOnHold(@Param('id') orderId: string) {
        return await this.orderServices.setStatusOnHold(orderId);
    }

    @Post('statusbackordered/:id')
    async setStatusBackordered(@Param('id') orderId: string) {
        return await this.orderServices.setStatusBackordered(orderId);
    }




    //lấy tất cả order
    @Get('getAllOrder')
    getAllOrder() {
        try {
            return this.orderServices.getAllOrder();
        } catch (error) {
            return error
        }
    }

    //sắp xếp order tăng dần
    @Get('sortHistory')
    sortHistory() {
        return this.orderServices.sortHistory();
    }

    // lấy order theo id
    @Get('getOrderById/:id')
    getOrderById(@Param('id') id: string) {
        try {
            return this.orderServices.getOrderById(id);
        } catch (error) {
            return error
        }
    }

}