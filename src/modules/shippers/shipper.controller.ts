import { Body, Controller, Post, Get, HttpException, HttpStatus, Param, Patch } from '@nestjs/common'
import { ShipperService } from './shipper.service';
import { ShipperDto } from 'src/dto/dto.shipper';


@Controller('shippers')
export class ShipperController {

    constructor(private readonly shipperService: ShipperService) {}

    
     // tạo shipper
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
 
     //lấy tất cả shipper
     @Get('getAllShipper')
     getAllOrder(){
         try {
             const shipper = this.shipperService.getAllShipper();
             if(!shipper) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
             return shipper;
         } catch (error) {
             return error
         }
     }


     //lấy lịch sử shipper
     @Get('getHistoryOrder/:id')
     getHistoryShipper(@Param('id') id: string){
         try {
             const shipper = this.shipperService.getHistory(id);
             if(!shipper) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
             return shipper;
         } catch (error) {
             return error
         }
     }

      // sửa review
      @Patch('updateLocation/:id')
      updateLocation(@Param('id') id: string, @Body() body: {longitude: number, latitude: number}) {
          try {
                const { longitude, latitude } = body;
              const review = this.shipperService.updateLocation(id, longitude, latitude);
              return review;
          } catch (error) {
              console.error("Update location fail", error)
          }
      }

}