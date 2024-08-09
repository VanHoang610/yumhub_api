import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { FoodDto } from 'src/dto/dto.food';
import { UpdateFoodDto } from 'src/dto/dto.updateFood';
import { Mailer } from 'src/helper/mailer';
import { Food } from 'src/schemas/food.schema';
import { FoodStatus } from 'src/schemas/foodStatus.schema';
import { GroupOfFood } from 'src/schemas/groupOfFood.schema';
import { Merchant } from 'src/schemas/merchant.schema';
import { UserMerchant } from 'src/schemas/userMerchant.schema';
const { ObjectId } = require('mongodb');
const removeAccents = require('remove-accents');

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private FoodModel: Model<Food>,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    @InjectModel(GroupOfFood.name) private GroupOfFoodModel: Model<GroupOfFood>,
    @InjectModel(FoodStatus.name) private foodStatusModel: Model<FoodStatus>,
    @InjectModel(UserMerchant.name) private userMerchantModel: Model<FoodStatus>,
  ) { }

  async createFood(createFood: FoodDto) {
    try {
      const merchant = createFood.merchantID;
      const merchantID = await this.merchantModel.findById(merchant);
      if (!merchantID)
        throw new HttpException('Not Found MerchantID', HttpStatus.NOT_FOUND);

      if (!createFood.group) createFood.group = null;
      else {
        const groupOfFood = createFood.group;
        const groupOfFoodID = await this.GroupOfFoodModel.findById(groupOfFood);
        if (!groupOfFoodID)
          throw new HttpException(
            'Not Found GroupOfFoodID',
            HttpStatus.NOT_FOUND,
          );
      }

      const food = new this.FoodModel({
        merchantID: merchantID._id,
        status: '661f9962fc13ae6967a24534',
        ...createFood,
      });
      const saveFood = await food.save();
      return { result: true, food: saveFood };
    } catch (error) {
      return { result: false, food: error };
    }
  }

  async setStatusFood(foodID: string, status: string | number) {
    try {
      let idStatus: object;
      const parsedStatus = parseInt(status as string);
      const Statuss = await this.foodStatusModel.find().exec();
      switch (parsedStatus) {
        case 1:
          for (const status of Statuss) {
            if (status.name === 'processingFood') {
              idStatus = status._id;
              break;
            }
          }
          break;
        // case 2:
        //     for (const status of Statuss) {
        //         if (status.name === "processingImage") {
        //             idStatus = status._id
        //             break
        //         }
        //     }

        // break;
        case 2:
          for (const status of Statuss) {
            if (status.name === 'onSale') {
              idStatus = status._id;
              break;
            }
          }
          break;
        case 3:
          for (const status of Statuss) {
            if (status.name === 'outOfStock') {
              idStatus = status._id;
              break;
            }
          }
          break;
        case 4:
          for (const status of Statuss) {
            if (status.name === 'deleted') {
              idStatus = status._id;
              break;
            }
          }
          break;

        default:
          return 'nhập 1-4';
      }
      const updatedOrder = await this.FoodModel.findOneAndUpdate(
        { _id: foodID },
        { status: idStatus },
        { new: true },
      );
      return { result: true, update: 'Đã thay đổi trạng thái' };
    } catch (error) {
      return { result: false, update: error };
    }
  }

  async getFoodById(id: string) {
    try {
      const Foods = await this.FoodModel.findById(id)
        .populate('merchantID')
        .populate('status')
        .populate({
          path: 'typeOfFood',
          strictPopulate: false,
        });
      if (!Foods) return { Message: 'Not found food' };
      return { result: true, Foods: Foods };
    } catch (error) {
      return { result: false, Foods: error };
    }
  }

  async getFoodByStatus(status: string | number) {
    const parsedStatus = parseInt(status as string);
    switch (parsedStatus) {
      case 1:
        return {
          processingFood: await this.FoodModel.find({
            status: '661f9962fc13ae6967a24534',
          })
            .populate('merchantID')
            .populate('status')
            .populate({
              path: 'typeOfFood',
              strictPopulate: false,
            })
            .exec(),
        };
      // case 2:
      //     return {processingImage: await this.FoodModel.find({ status: "661f9962fc13ae6967a24535" }).exec()}
      case 2:
        return {
          onSale: await this.FoodModel.find({
            status: '661fb317ee3a326f69b55386',
          })
            .populate('merchantID')
            .populate('status')
            .populate({
              path: 'typeOfFood',
              strictPopulate: false,
            })
            .exec(),
        };
      case 3:
        return {
          outOfStock: await this.FoodModel.find({
            status: '661f9962fc13ae6967a24536',
          })
            .populate('merchantID')
            .populate('status')
            .populate({
              path: 'typeOfFood',
              strictPopulate: false,
            })
            .exec(),
        };
      case 4:
        return {
          deleted: await this.FoodModel.find({
            status: '661f9962fc13ae6967a24537',
          })
            .populate('merchantID')
            .populate('status')
            .populate({
              path: 'typeOfFood',
              strictPopulate: false,
            })
            .exec(),
        };
    }
  }

  async getFoodByMerchant(merchantid: string) {
    try {
      const Foods = await this.FoodModel.find({
        merchantID: merchantid,
        status: '661fb317ee3a326f69b55386',
      });
      const outOfStock = await this.FoodModel.find({
        merchantID: merchantid,
        status: '661f9962fc13ae6967a24536',
      });
      if (!Foods) return { Message: 'Not found food' };
      return { result: true, onSale: Foods, outOfStock: outOfStock };
    } catch (error) {
      return { result: false, Foods: error };
    }
  }

  async findApproveFood(keyword: string) {
    const statusObjectId = new ObjectId('661f9962fc13ae6967a24534');
    const regex = new RegExp(keyword, 'i');
    const pipeline = [
      {
        $lookup: { // nối bảng
          from: 'merchants', // Tên bảng merchants
          localField: 'merchantID', // Trường kết nối từ bảng foods
          foreignField: '_id', // Trường kết nối từ bảng merchants
          as: 'merchant', // Tên alias cho bảng kết hợp
        },
      },
      {
        $unwind: {
          path: '$merchant',
          preserveNullAndEmptyArrays: true, // Đảm bảo tài liệu không có merchant vẫn được giữ lại
        },
      },
      {
        $addFields: {
          _idStr: { $toString: '$_id' },
          nameMerchant: '$merchant.name', // Truy cập tên merchant sau khi unwind
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { nameFood: regex },
                { price: regex },
                { nameMerchant: regex }, // Thêm điều kiện tìm kiếm theo tên merchant
              ],
            },
            { status: statusObjectId },
          ],
        },
      },
    ];

    const foods = await this.FoodModel.aggregate(pipeline).exec();

    return { result: true, foods: foods };
  }

  // async updateImg(foodId:string, img: string){

  //     try{
  //         const Foods = await this.FoodModel.findByIdAndUpdate(
  //             foodId, // Truyền foodId làm tham số đầu tiên
  //             { image: img, status: "661f9962fc13ae6967a24535" }, // Object chứa các trường và giá trị cập nhật
  //             { new: true } // Tùy chọn để trả về document sau khi cập nhật
  //         );
  //         if (!Foods) return { Message: "Not found food" };
  //         return { result: true, Foods: Foods };
  //     } catch (error) {
  //         return { result: false, Foods: error };
  //     }
  // }

  async updateFood(foodId: string, updateFood: UpdateFoodDto): Promise<{ result: boolean, message?: string, food?: any }> {
    try {
      const food = await this.FoodModel.findByIdAndUpdate(
        foodId,
        updateFood,
        { new: true }
      );

      if (!food) {
        console.log(`Food not found with ID: ${foodId}`);
        return { result: false, message: 'Không tìm thấy món ăn' };
      }

      return { result: true, food: food };
    } catch (error) {
      console.error(`Error updating food with ID: ${foodId}`, error);
      return { result: false, message: error.message };
    }
  }
  async searchFoodByName(any) {
    // Loại bỏ dấu từ chuỗi tìm kiếm
    const searchQuery = removeAccents(any);

    // Lấy tất cả các món ăn từ cơ sở dữ liệu
    const foods = await this.FoodModel.find().exec();

    // Lọc các món ăn dựa trên chuỗi tìm kiếm không dấu
    const filteredFoods = foods.filter(food => {
      const nameFoodNoAccent = removeAccents(food.nameFood);
      return nameFoodNoAccent.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return filteredFoods;
  }
  
  async searchFoods(price: number, name: string) {
    // Tạo một object để chứa các điều kiện lọc
    const query: any = { status: '661fb317ee3a326f69b55386' }; // status onSale

    // Thêm điều kiện lọc theo giá
    if (price) {
      query.price = { $lte: price }; // Tìm các món ăn có giá nhỏ hơn hoặc bằng price
    }

    // Thêm điều kiện lọc theo tên món ăn
    if (name) {
      query.nameFood = { $regex: name, $options: 'i' }; // Tìm các món ăn có tên chứa name
    }
    // Thực hiện truy vấn MongoDB với các điều kiện lọc
    const foods = await this.FoodModel.find(query).exec();
    return { result: true, food: foods };
  }

  async getAllFoods() {
    try {
      const foods = await this.FoodModel.find()
        .populate('merchantID')
        .populate('status')
        .populate({
          path: 'typeOfFood',
          strictPopulate: false,
        })
        .exec();

      // Trả về mảng rỗng nếu không có foods nào được tìm thấy
      if (!foods || foods.length === 0) {
        return { result: true, foods: [] };
      }

      return { result: true, foods: foods };
    } catch (error) {
      return { result: false, message: error.message };
    }
  }
  async deleteFood(id: string, note: string) {
    try {
      const food = await this.FoodModel.findById(id);
      if (!food) {
        return { result: false, message: 'Không tìm thấy món ăn' };
      }

      const user = await this.userMerchantModel.findOne({merchantID: food.merchantID, role: 1}) as UserMerchant;

      if (!user) {
        return { result: false, message: 'Không tìm thấy người dùng' };
      }
      const merchant = await this.merchantModel.findById(food.merchantID);
      if (!merchant) {
        return { result: false, message: 'Không tìm thấy người dùng' };
      }

      const content = `
            Xin lỗi: <strong>${user.fullName}</strong><br/>
            Thông tin đăng ký món ăn <strong>${food.nameFood}</strong> của <strong>${merchant.name} </strong>chưa hợp lệ: <strong>${note}</strong><br/>
            Vui lòng kiểm tra và cập nhật lại những thông tin sai.<br/>
            
        `;
        const mail = await Mailer.sendMail({
          email: user.email,
          subject: 'Thông báo từ chối đăng ký Món ăn',
          content: content,
        });
        await this.FoodModel.findByIdAndDelete(id);
      return { result: true, message: "Đã xóa món ăn thành công" };
    } catch (error) {
      return { result: false, message: error.message };
    }
  }
}
