import { Schema, model, Document } from 'mongoose';

export interface IWaitlistUser extends Document {
  contactInfo: string;
  createdAt: Date;
  updatedAt: Date;
}

const waitlistUserSchema = new Schema<IWaitlistUser>(
  {
    contactInfo: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

export const WaitlistUser = model<IWaitlistUser>('waitlist_users', waitlistUserSchema);
