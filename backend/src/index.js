import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import { testConnection, syncModels } from './config/database.js';
import bitcoinRoutes from './routes/bitcoin.js';

dotenv.config();

const initializeServer = async () => {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    credentials: true
  }));

  // Routes
  app.get('/', (req, res) => {
    res.send("E-Commerce API is running");
  });
  
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes); 
  app.use('/api/bitcoin', bitcoinRoutes);

  // Database setup
  await testConnection();
  await syncModels(); 

  const port = process.env.PORT || 4321; 
  
  app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}\n`);
  });
};

initializeServer().catch(err => {
  console.error('Server initialization failed:', err);
  process.exit(1);
});