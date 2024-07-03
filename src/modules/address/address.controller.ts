import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {

    constructor (private readonly addressService: AddressService) { }

    @Get('addData')
    addData () {
        return this.addressService.addData();
    }

    @Get('showAll')
    showAll (@Query('id') id: string) {
        return this.addressService.showAll(id);
    }
    
    @Post('deleteAddress')
    deleteAddress (@Query('id') id: string) {
        return this.addressService.deleteAddress(id);
    }

    @Patch('updateAddress')
    updateAddress (@Query('id') id: string, @Body() updateAddress: any) {
        return this.addressService.updateAddress(id, updateAddress);
    }

    @Post('addAddress')
    addAddress (@Body() address: any) {
        return this.addressService.addAddress(address);
    }
}