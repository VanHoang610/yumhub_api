import { Body, Controller, Post, Get, HttpException, HttpStatus} from '@nestjs/common'
import { ShipperService } from './shipper.service';
import { ShipperDto } from 'src/dto/dto.shipper';


@Controller('shippers')
export class ShipperController {

    constructor(private readonly shipperService: ShipperService) {}

    
     // tạo order
     @Post('createShipper')
     createOrder(@Body() shipperService: ShipperDto) 
     {
         try {
             const shipper = this.shipperService.createShipper(shipperService);
             return shipper;
         } catch (error) {
             console.error("Create Shipper Fail", error)
         }
     }
 
     //lấy tất cả order
     @Get('getAllShipper')
     getAllOrder(){
         try {
             const order = this.shipperService.getAllShipper();
             if(!order) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
             return order
         } catch (error) {
             return error
         }
     }


}