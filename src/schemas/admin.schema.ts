import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Admin {
    
    @Prop({required: true, unique: true})
    userName: string

    @Prop({required: true, default: "123"})
    password: string

    @Prop({required: false})
    fullName: string

    @Prop({required: false})
    avatar: string

    @Prop({required: false})
    sex: string

    @Prop({required: false, unique: true})
    email: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)