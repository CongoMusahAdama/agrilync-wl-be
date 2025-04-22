import { Router } from 'express';
import { registerWaitlistUser } from '../controllers/waitlist.controller';

const router = Router();

router.post('/waitlist', registerWaitlistUser);

export default router;
