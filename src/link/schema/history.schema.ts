import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Data } from 'ws';

export type HistoryDocument = History & Document;

@Schema()
export class History {
    @Prop({ required: true })
    alias: string;

    @Prop({ required: true })
    accessIP: string;

    @Prop({ required: true })
    accessTime: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
