import { Body, Controller, Post, Get, HttpException, HttpStatus, Param, ValidationPipe } from '@nestjs/common'
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/dto.order';

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
    async createOrder(@Body() orderDto: OrderDto) {
        return await this.orderServices.createOrder(orderDto);
    }

    @Post('statusOrder/:id/:status')
    async setStatus(@Param('id') orderId: string, @Param('status') status: number) {
        return await this.orderServices.setStatus(orderId, status);
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
    @Post('sortHistory/:id')
    sortHistory(@Param('id') id: string, @Body() body: { who: number }) {
        const { who } = body;
        return this.orderServices.sortHistory(id, who);
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
    @Get('RevenueYumhub')
     getRevenueTime(@Body() body: { month:string }) {
         try {
            const {month} = body
             const totalRevenue = this.orderServices.revenueMonth(month);
             if (!totalRevenue) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
             return totalRevenue;
         } catch (error) {
             return error
         }
     }

}