import { Body, Controller, Post, Get, HttpException, HttpStatus, Param, ValidationPipe } from '@nestjs/common'
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/dto.order';

@Controller('orders')
export class OrderController {

    constructor(private readonly orderServices: OrderService) { }

    // tạo order
    @Post('createOrder')
    async createOrder(@Body() orderDto: OrderDto) {
        return this.orderServices.createOrder(orderDto);
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