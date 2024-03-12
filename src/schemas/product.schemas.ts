import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {

    @Prop({ unique: true, required: true})
    id: number;

    @Prop({ required: true})
    categoriesID: number;

    @Prop({ required: false})
    productName: string;

    @Prop({ required: false})
    price: number;

}

export const ProductSchema =  SchemaFactory.createForClass(Product);