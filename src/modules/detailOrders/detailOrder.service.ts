import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailOrderDto } from 'src/dto/dto.detailOrder';
import { DetailOrder } from 'src/schemas/detailOrder.schema';
import { Food } from 'src/schemas/food.schema';
import { Order } from 'src/schemas/order.schema';

@Injectable()
export class DetailOrderService {

    constructor(@InjectModel(DetailOrder.name) private detailOrderModel: Model<DetailOrder>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Food.name) private foodModel: Model<Food>) { }

    async createDetail(createDetailDto: DetailOrderDto) {
        try {
            const { orderID, foodID, quantity, description } = createDetailDto;

            // Tìm thông tin sản phẩm dựa trên id food
            const food = await this.foodModel.findById(foodID);
            if (!food) {
                throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
            }
            const imgFood= await this.foodModel.findById(foodID).select('image');

            

            // Tính toán giá của chi tiết sản phẩm
            const price = food.priceForSale * quantity;

            // Tạo đối tượng chi tiết sản phẩm mới
            const newDetailProduct = new this.detailOrderModel({
                orderID: orderID,
                foodID: foodID,
                quantity: quantity,
                price: price,
                description: description
            });

            // Lưu đối tượng vào cơ sở dữ liệu
            const createdDetailProduct = await newDetailProduct.save();
            // Trả về thông tin chi tiết sản phẩm đã tạo
            return { result: true, detailProduct: createdDetailProduct, imgFood:imgFood };
        } catch (error) {
            return { result: false, error: error.message };
        }
    }

    async totalPrice(id: string) {
        try{
            let totalPrice = 0;
            // Tìm tất cả idorder trong detailOrder
            const details = await this.detailOrderModel.find().exec();
            for (const detail of details) {
                const detailID = detail.orderID.toString();
                if (detailID === id) {
                    totalPrice += detail.price;
                } else {
                    continue;
                }
            }
         return totalPrice
        }catch(error){return  error}
            
    }

    async deleteDetail(id: string) {
        await this.detailOrderModel.findOneAndDelete({ _id: id }).exec();
    }
    async showDetail(orderId:string){
        return this.detailOrderModel.find({ orderID:orderId }).exec();
    }

}

