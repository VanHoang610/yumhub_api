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
    address: string

    @Prop({required: false})
    gender: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true, unique: true})
    phoneNumber: string

    @Prop({required: false})
    dob: Date

    @Prop({required: false, default: "employee"}) //employee Yumhub,  manager
    position: string

    @Prop({required: false})
    createdAt: Date

    @Prop({required: false})
    updatedAt: Date

    @Prop({required: false})
    createdBy: string

    @Prop({required: false})
    updatedBy: string

    @Prop({required: false, default: false})
    deleted: boolean
}

export const AdminSchema = SchemaFactory.createForClass(Admin)