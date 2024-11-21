import { Schema, Document } from 'mongoose';

export interface Review {
  rating: number;
  comment: string;
}

export interface Driver extends Document {
  _id: string;
  name: string;
  description: string;
  car: string;
  review: Review;
  ratePerKm: number;
  minKm: number;
}

export const DriverSchema = new Schema<Driver>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  car: { type: String, required: true },
  review: {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  ratePerKm: { type: Number, required: true },
  minKm: { type: Number, required: true },
});
