import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common'
import { DetailOrderService } from './detailOrder.service';
import { DetailOrderDto } from 'src/dto/dto.detailOrder';
import { AuthGuard } from 'src/helper/auth.middleware';

@Controller('detail')

export class DetailOrderController {

    constructor(private readonly detailOrderService: DetailOrderService) { }
    @Post('createDetail')
    @UseGuards(AuthGuard)
    createDetail(@Body() DetailService: DetailOrderDto) {
            return this.detailOrderService.createDetail(DetailService);
    }

    @Get('order')
    @UseGuards(AuthGuard)
    getAllorder(@Query('id') Orderid: string){
        try {
            const detail = this.detailOrderService.showDetail(Orderid);
            if(!detail) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return detail;
        } catch (error) {
            return error
        }
    }
    @Get('totalprice')
    @UseGuards(AuthGuard)
    getPriceTotal(@Query('id') Orderid: string){
        try {
            const detail = this.detailOrderService.totalPrice(Orderid);
            if(!detail) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return detail;
        } catch (error) {
            return error
        }
    }

    @Delete('delete')
    @UseGuards(AuthGuard)
    async deleteReview(@Query('id') id: string) {
        try {
            await this.detailOrderService.deleteDetail(id);
            return { message: 'Xoá món thành công' };
        } catch (error) {
            throw new HttpException('Không thể xoá món', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}