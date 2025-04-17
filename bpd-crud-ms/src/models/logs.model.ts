import mongoose, { Schema, Document } from 'mongoose';
import { LogAction } from '../utils/constants';


export interface LogDocument extends Document {
  userId: string;
  action: LogAction;
  timestamp: Date;
  metadata?: any;
  deletedMessage?: string;
}

const LogSchema: Schema = new Schema({
  userId: { type: String, required: true },
  action: { type: String, enum: ['CREATE', 'READ', 'UPDATE', 'DELETE'], required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed },
  deletedMessage: { type: String }
});

export default mongoose.model<LogDocument>('Log', LogSchema);