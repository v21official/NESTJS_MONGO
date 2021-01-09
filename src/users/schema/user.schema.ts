import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    token: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
