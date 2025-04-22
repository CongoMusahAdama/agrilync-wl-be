import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import waitlistRoutes from './routes/waitlist.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

const allowedOrigins = ['https://agrilync-wl-be.onrender.com', 'https://agrilync.netlify.app'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like mobile apps or curl requests
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
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
