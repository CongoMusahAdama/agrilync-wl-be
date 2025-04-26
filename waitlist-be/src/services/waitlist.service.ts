import { WaitlistUser, IWaitlistUser } from '../models/waitlist.model';

export const findUserByContact = async (contactInfo: string): Promise<IWaitlistUser | null> => {
  return await WaitlistUser.findOne({ contactInfo });
};

export const createWaitlistUser = async ( contactInfo: string): Promise<IWaitlistUser> => {
  const newUser = new WaitlistUser({ contactInfo });
  return await newUser.save();
};
