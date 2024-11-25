import { Schema } from 'mongoose';

export interface Ride extends Document {
  _id?: string;
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver_id: string;
  value: number;
}
export const RideSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  customer_id: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  driver_id: { type: String, required: true },
  value: { type: Number, required: true },
});
