import { Request, Response } from 'express';
import { validateContact } from '../utils/validateContact';
import { findUserByContact, createWaitlistUser } from '../services/waitlist.service';

export const registerWaitlistUser = async (req: Request, res: Response): Promise<void> => {
  const { fullName, contactInfo } = req.body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
    res.status(400).json({ success: false, message: 'Invalid input. Please check your details.' });
    return;
  }

  if (!contactInfo || typeof contactInfo !== 'string' || !validateContact(contactInfo)) {
    res.status(400).json({ success: false, message: 'Invalid input. Please check your details.' });
    return;
  }

  try {
    const existingUser = await findUserByContact(contactInfo.trim());
    if (existingUser) {
      res.status(409).json({ success: false, message: 'This email or phone number is already registered.' });
      return;
    }

    await createWaitlistUser(fullName.trim(), contactInfo.trim());
    res.status(201).json({ success: true, message: 'Thank you for joining the AgriLync waitlist!' });
  } catch (error) {
    console.error('Error registering waitlist user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
