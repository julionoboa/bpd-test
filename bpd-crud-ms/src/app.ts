import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import profileRoutes from './routes/profile.routes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', profileRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Service bpd-crud-ms running on http://localhost:${PORT}`);
  });
});

setupSwagger(app);