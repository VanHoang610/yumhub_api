import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Image{
    @Prop({required: true})
    name: string


    @Prop({required: true})
    data: string

    @Prop({required: true})
    contentType: string
};

    



export const ImageSchema = SchemaFactory.createForClass(Image)