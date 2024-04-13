import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { ShipperService } from './shipper.service';
import { ShipperDto } from 'src/dto/dto.shipper';
import mongoose from "mongoose";
import { RegisterShipperDto } from 'src/dto/dto.registerShipper';
import { LoginDto } from 'src/dto/dto.login';


@Controller('shippers')
export class ShipperController {

    constructor(private readonly shipperService: ShipperService) {}

    @Get('newUser')
    newShipper() 
    {
        return this.shipperService.newShipperInMonth();
    }
    
    @Get('RevenueWeek')
    getRevenueWeek(@Body() body: {ID:string}) {
        try {
            const {ID } = body
            const totalRevenue = this.shipperService.getRevenueWeek(ID);
            if (!totalRevenue) {
                throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            }
            return totalRevenue;
        } catch (error) {
            return error;
        }
    }
    @Get('RevenueMonth')
    getRevenueMonth(@Body() body: {ID:string, month: string}) {
        try {
            const {ID , month} = body
            const totalRevenue = this.shipperService.getRevenueMonth(ID, month);
            if (!totalRevenue) {
                throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            }
            return totalRevenue;
        } catch (error) {
            return error;
        }
    }
    @Get('RevenueTTT')
     getRevenueTime(@Body() body: {ID:string, startDate: string, endDate: string }) {
         try {
            const {ID, startDate, endDate } = body
             const totalRevenue = this.shipperService.revenueShipperTimeTwoTime(ID, startDate, endDate);
             if (!totalRevenue) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
             return totalRevenue;
         } catch (error) {
             return error
         }
     }

    // add Data
    @Get('addData')
    addData() 
    {
        try {
            const shipper = this.shipperService.addData();
            return shipper;
        } catch (error) {
            console.error("Create Shipper Fail", error)
        }
    }

     // tạo shipper
     @Post('createShipper')
     createOrder(@Body() shippers: RegisterShipperDto) 
     {
         try {
             const shipper = this.shipperService.createShipper(shippers);
             return shipper;
         } catch (error) {
             console.error("Create Shipper Fail", error)
         }
     }
 
     //lấy tất cả shipper
     @Get('getAllShipper')
     getAllShipper(){
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
             return {result: true,  history: shipper};
         } catch (error) {
             return {result:false,error} 
         }
     }

      // sửa location của shipper
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
  
    // @Get('getPhoneNumberShipper/:id')
    // getPhoneNumberShipper(@Param('id') id: string){
    //     return this.shipperService.getPhoneNumberShipper(id);
    // }
    
    @Post('deleteShipper/:id')
    deleteShipper(@Param('id') id: string){
        return this.shipperService.deleteShipper(id);
    }

    @Patch('updateShipper/:id')
    async updateShipper(@Param('id') id: string, @Body(new ValidationPipe()) updateShipper: ShipperDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 40);
        return  await this.shipperService.updateShipper(id, updateShipper);
    }

    //login
    @Post('login')
    login(@Body(new ValidationPipe()) login: LoginDto) {
        return this.shipperService.login(login);
    }

    //quên mật khẩu bằng Email
   @Post('forgetPassByEmail')
   forgetPasswordByEmail(@Body() body: { email: string }) {
       const { email } = body;

       return this.shipperService.forgetPassByEmail(email);
   }

   //kiểm tra OTP
   @Post('checkOTP')
   checkOTP(@Body() body: { email: string, otp: string }){
       const { email, otp } = body;
       return this.shipperService.checkOTP(email, otp);
   }

   //cập nhật mật khẩu
   @Post('resetPass/:id')
   resetPass(@Param('id') id: string, @Body() body: { password: string }){
       const { password } = body;
       return this.shipperService.resetPass(id, password);
   }


   //đổi mật khẩu
   @Post('changePass/:id')
   changePassword(@Param('id') id: string, @Body() body: { passOld: string, passNew: string }) {
       const { passOld, passNew } = body;
       return this.shipperService.changePass(id, passOld, passNew);
   }

   //gửi email xác thực
    @Post('verifileShipper')
    verifileMerchant(@Body() body: { email: string }) {
        const { email } = body;
        return this.shipperService.verifileMerchant(email);
    }
}