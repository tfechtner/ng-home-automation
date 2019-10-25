import * as mongoose from 'mongoose';

export interface Event extends mongoose.Document {
    readonly name: string;
}
