import exp from 'express';
import dotenv from 'dotenv';
import { empApp } from './APIs/employeeAPI.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = exp();

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(exp.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/emp-api', empApp);

async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGODB_URI environment variable is required');

    await mongoose.connect(mongoUri);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });

  } catch (err) {
    console.log('error occured while connecting to dbase', err);
    process.exit(1);
  }
}

connectDB();

app.use((err, req, res, next) => {
  console.log('err in middleware:', err.message);

  res.status(err.status || 500).json({
    message: 'error',
    reason: err.message,
  });
});