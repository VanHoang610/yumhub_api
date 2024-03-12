//lấy dữ liệu client

import { MinLength, IsNotEmpty, IsNumber, IsInt, IsEmpty } from "class-validator"; // kiểm tra validate
export class ProductDto {
    @IsNotEmpty({message: 'ID Categories không được để trống'}) // không được để trống
    @IsNotEmpty({ message: 'ID Categories không được để trống' })
    @IsNumber({}, { message: 'ID Categories phải là số' })
    @IsInt({ message: 'ID Categories phải là số nguyên' })
    categoriesID?: number;

    @MinLength(5, {message: 'Tên sản phẩm phải trên 5 kí tự'})
    productName: string;

    @IsNumber()
    @IsEmpty()
    price: number
};