import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import waitlistRoutes from './routes/waitlist.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

//routes
app.use('/api', waitlistRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to database', error);
  process.exit(1);
});
