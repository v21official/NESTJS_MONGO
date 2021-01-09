import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
    @Prop({ required: true })
    original: string;

    @Prop({ required: true })
    alias: string;

    @Prop({ required: true })
    shortenLink: string;

    @Prop({ required: true })
    username: string;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
