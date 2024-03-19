import { Controller, Post, Body, ValidationPipe, Get, Param, Patch, HttpException, Delete } from "@nestjs/common";
import { CustomerDto } from "src/dto/dto.customer";
import { CustomerServices } from "./customer.service";
import mongoose from "mongoose";
import { retry } from "rxjs";


@Controller('customers')
export class CustomerController {

    constructor(private readonly customerService : CustomerServices) {}


    // tạo customer
    @Post('createCustomer')
    createUser(@Body(new ValidationPipe()) customerDto: CustomerDto){
        return this.customerService.createUser(customerDto)
    }

    // lấy customer theo id
    @Get(':id')
    getCustomerByID(@Param('id') id: string){
        return this.customerService.getCustomerById(id).populate('userID');
    }

    // lấy tất cả customer
    @Get()
    getCustomer(){
        return this.customerService.getCustmer();
    }


    // lấy SDT 
    @Get('getPhoneNumber/:id')
    getPhoneNumber(@Param('id') id: string){
        return this.customerService.getPhoneNumber(id);
    }


    // xóa customer
    @Post('deleteCustomer/:id')
    deleteCustomer(@Param('id') id: string){
        return this.customerService.deleteCustomer(id);
    }

    // sửa customer
    @Patch('updateCustomer/:id')
    async updateCustomer(@Param('id') id: string, @Body(new ValidationPipe()) updateCustomer: CustomerDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 40);
        return  await this.customerService.updateCustomer(id, updateCustomer);
    
    }

     // lấy dánh sách lịch sử theo id
     @Get('getHistoryCustomer/:id')
     getHistoryById(@Param('id') id: string){
         return this.customerService.getHistoryById(id);
     }
    
}


