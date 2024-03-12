import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Admin {
    
    @Prop({required: true, unique: true})
    userName: string

    @Prop({required: true})
    password: string

    @Prop({required: false})
    fullName: string

    @Prop({required: false})
    avatar: string

    @Prop({required: false})
    sex: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)