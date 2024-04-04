import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from 'src/dto/dto.order';
import { Order } from 'src/schemas/order.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from 'src/schemas/customer.schemas';
import { Merchant } from 'src/schemas/merchant.schema';
import { Shipper } from 'src/schemas/shipper.schema';
import { Voucher } from 'src/schemas/voucher.schema';
import { OrderStatus } from 'src/schemas/orderStatus.schema';



@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
        @InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
        @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
        @InjectModel(OrderStatus.name) private statusModel: Model<OrderStatus>,

    ) { };

    async createOrder(orderDto: OrderDto) {
        try {
            const customerID = orderDto.customerID;
            const customers = await this.customerModel.findById(customerID);
            if (!customers) throw new HttpException("Not Found Customer", HttpStatus.NOT_FOUND);

            const merchantID = orderDto.merchantID;
            const merchants = await this.merchantModel.findById(merchantID);
            if (!merchants) throw new HttpException("Not Found Merchant", HttpStatus.NOT_FOUND);

            const shipperID = orderDto.shipperID;
            const shippers = await this.shipperModel.findById(shipperID);
            if (!shippers) throw new HttpException("Not Found Shipper", HttpStatus.NOT_FOUND);

            const voucherID = orderDto.voucherID;
            const vouchers = await this.voucherModel.findById(voucherID);
            if (!vouchers) throw new HttpException("Not Found Voucher", HttpStatus.NOT_FOUND);

            const status = this.getStatusPending()

            const orders = new this.orderModel({
                customerID: customers._id,
                merchantID: merchants._id,
                shipperID: shippers._id,
                voucherID: vouchers._id,
                timeBook: Date.now(),
                status: status,
                ...orderDto
            });

            await orders.save();
            return { success: true, order: orders };

        } catch (error) {
            return { success: false, order: error };
        }
    }


    async getAllOrder() {
        try {
            const orders = await this.orderModel.find().populate('customerID').populate('merchantID').populate('shipperID').populate('voucherID');
            if (!orders) return { Message: "Not found Order" }
            return { result: true, order: orders }
        } catch (error) {
            return { result: false, order: error }
        }
    }

    async sortHistory() {
        try {
            const orderSort = await this.orderModel.find({}).sort({ timeBook: 1 }).exec();
            return { result: true, orderSort: orderSort }
        } catch (error) {
            return { result: false, orderSort: error }
        }
    }

    async getOrderById(id: string) {
        try {
            const orders = await this.orderModel.findById(id);
            if (!orders) return { Message: "Not found Order" }
            return { result: true, order: orders }
        } catch (error) {
            return { result: false, order: error }
        }
    }
    // lấy id của Đơn hàng đã được tạo nhưng chưa được xác nhận hoặc xử lý.
    async getStatusPending() {
        let idStatus: object;
        const Statuss = await this.statusModel.find().exec();
        for (const status of Statuss) {
            if (status.name === "Pending") {
                idStatus = status._id
                break
            }
        }
        return idStatus
    }
    async setStatusPending(orderId: string) {
        let idStatus = this.getStatusPending
        const updatedOrder = await this.orderModel.findOneAndUpdate(
            { _id: orderId },
            { status: idStatus },
            { new: true } // Trả về bản ghi đã cập nhật
        );



    }
    //Đơn hàng đang được xử lý, đang trong quá trình chuẩn bị hoặc đang chờ đợi để được giao.
    async setStatusProcessing(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Processing") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }

    }
    //Đơn hàng đã được giao cho nhà vận chuyển hoặc đang trên đường đi đến địa chỉ của khách hàng.
    async setStatusShipped(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Shipped") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    //Đơn hàng đã được giao thành công và được nhận bởi khách hàng.
    async setStatusDelivered(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Delivered") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    //Đơn hàng đã bị hủy trước khi được giao hoặc sau khi đã được giao.
    async setStatusCancel(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Cancel") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    //Đơn hàng đang bị tạm ngưng xử lý, thường do các vấn đề tài chính hoặc thông tin không chính xác từ khách hàng.
    async setStatusOnHold(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "OnHold") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    async setStatusBackordered(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Backordered") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }


}