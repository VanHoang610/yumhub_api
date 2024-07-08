import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from 'src/schemas/address.schema';

@Injectable()
export class AddressService {

  constructor(@InjectModel(Address.name) private address: Model<Address>) { }

  async addData() {
    try {
      const addData = await this.address.create([
        {
          "customerID": "6642e8e5a4d18565675c0f9a",
          "city": "Toulouse",
          "district": "31004 CEDEX 6",
          "ward": "0471 Pawling Circle",
          "street": "Female",
          "houseNumber": "50",
          "longitude": 1.4525313,
          "latitude": 43.6085373
        }, {
          "customerID": "6642db3ba4d18565675c0f85",
          "city": "Guanaja",
          "district": "Quận 10",
          "ward": "01 Pond Trail",
          "street": "Male",
          "houseNumber": "5",
          "longitude": -85.8793252,
          "latitude": 16.4826614
        }, {
          "customerID": "6642d855a4d18565675c0f7e",
          "city": "Wukeshu",
          "district": "Quận 10",
          "ward": "8767 Roth Circle",
          "street": "Male",
          "houseNumber": "627",
          "longitude": 103.323844,
          "latitude": 24.820587
        }, {
          "customerID": "6642d32edbdb4822ab52e189",
          "city": "Şafwá",
          "district": "Quận 10",
          "ward": "1 Petterle Center",
          "street": "Female",
          "houseNumber": "316",
          "longitude": 49.9161886,
          "latitude": 26.6274775
        }, {
          "customerID": "6642d2937ab32a7a704b0588",
          "city": "Pasarbaru",
          "district": "Quận 10",
          "ward": "4 Tony Road",
          "street": "Male",
          "houseNumber": "474",
          "longitude": 106.8340622,
          "latitude": -6.1671806
        }, {
          "customerID": "661e69f5d0a002c5d2328e2d",
          "city": "Semënovskoye",
          "district": "142817",
          "ward": "7 Garrison Plaza",
          "street": "Female",
          "houseNumber": "838",
          "longitude": 35.8272389,
          "latitude": 55.5146696
        }, {
          "customerID": "6617a739bee706a7e8633ed0",
          "city": "Panjakent",
          "district": "Quận 10",
          "ward": "79662 Bowman Road",
          "street": "Male",
          "houseNumber": "9",
          "longitude": 67.8569785,
          "latitude": 39.3547141
        }
      ])
      return { result: true, data: addData };
    } catch (error) {
      return { result: false, data: error };
    }
  }

  async showAll(id : string) {
    try {
      const address = await this.address.find({customerID: id}).exec();
      if (!address || address.length == 0){
        throw new HttpException('Not Found Address or customer no adress added', HttpStatus.NOT_FOUND);
      }
      return { result: true, data: address };
    } catch (error) {
      return { result: false, data: error };
    }
  }

  async deleteAddress(id: string) {
    try {
      const address = await this.address.findByIdAndDelete(id);
      return { result: true, data: address };
    } catch (error) {
      return { result: false, data: error };
    }
  }

  async updateAddress(id: string, updateAddress: Address) {
    try {
      const address = await this.address.findByIdAndUpdate(id, updateAddress, { new: true });
      return { result: true, data: address };
    } catch (error) {
      return { result: false, data: error };
    }
  }

  async addAddress(address: Address) {
    try {
      const addAddress = await this.address.create(address);
      return { result: true, data: addAddress };
    } catch (error) {
      return { result: false, data: error };
    }
  }

}