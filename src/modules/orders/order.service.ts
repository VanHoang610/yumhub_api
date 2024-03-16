import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from 'src/dto/dto.order';
import { Order } from 'src/schemas/order.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from 'src/schemas/customer.schemas';
import { Merchant } from 'src/schemas/merchant.schema';
import { Shipper } from 'src/schemas/shipper.schema';
import { Voucher } from 'src/schemas/voucher';
@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    @InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>
    ) { };

    async createOrder(orderDto: OrderDto) {
        try {
            const customerID = orderDto.customerID;
            const customers = await this.customerModel.findById(customerID);
            if(!customers) throw new HttpException("Not Found Customer", HttpStatus.NOT_FOUND);

            const merchantID = orderDto.merchantID;
            const merchants = await this.merchantModel.findById(merchantID);
            if(!merchants) throw new HttpException("Not Found Merchant", HttpStatus.NOT_FOUND);

            const shipperID = orderDto.shipperID;
            const shippers = await this.shipperModel.findById(shipperID);
            if(!shippers) throw new HttpException("Not Found Shipper", HttpStatus.NOT_FOUND);

            const voucherID = orderDto.voucherID;
            const vouchers = await this.voucherModel.findById(voucherID);
            if(!vouchers) throw new HttpException("Not Found Voucher", HttpStatus.NOT_FOUND);


            const orders = new this.orderModel({
                customerID: customers._id,
                merchantID: merchants._id,
                shipperID: shippers._id,
                voucherID: vouchers._id,
                dateBook: Date.now(),
                ...orderDto
            });
            await orders.save();

            return { success: true, order: orders };
            
        } catch (error) {
            console.error("Create Order Fail", error);
            return { "Create Order Fail": error };
        }
    }


    async getAllOrder() {
        try {
            const orders =  await this.orderModel.find().populate('customerID').populate('merchantID').populate('shipperID').populate('voucherID');
            if(!orders) return {Message: "Not found Order"} 
            return {result: true, order: orders}
        } catch (error) {
            return {result: false, order: error}
        }
    }

    async sortHistory () {
        try {
            const orderSort = await this.orderModel.find({status: 1}).sort({dateBook: 1}).exec();
            return {result: true, orderSort: orderSort}
        } catch (error) {
            return {result: false, orderSort: error}
        }
    }

    async getOrderById(id: string) {
        try {
            const orders =  await this.orderModel.findById(id);
            if(!orders) return {Message: "Not found Order"} 
            return {result: true, order: orders}
        } catch (error) {
            return {result: false, order: error}
        }
    }

}