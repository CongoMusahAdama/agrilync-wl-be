import { Request, Response } from 'express';
import { findUserByContact, createWaitlistUser } from '../services/waitlist.service';

export const registerWaitlistUser = async (req: Request, res: Response): Promise<void> => {
  const {  contactInfo } = req.body;

  try {
    const existingUser = await findUserByContact(contactInfo);
    if (existingUser) {
      res.status(409).json({ success: false, message: 'This email or phone number is already registered.' });
      return;
    }

    await createWaitlistUser(contactInfo);
    res.status(201).json({ success: true, message: 'Thank you for joining the AgriLync waitlist!' });
  } catch (error) {
    console.error('Error registering waitlist user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
