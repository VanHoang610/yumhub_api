import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ResetPassword {
    @Prop({required: true})
    email: string

    @Prop({required: true})
    otp: string

    @Prop({default: true})
    status: boolean
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);