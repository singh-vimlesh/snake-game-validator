import express from 'express';
import gameRoutes from './routes/game.routes';
import { errorHandler } from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/', gameRoutes);

// Default error handling for unsupported routes
app.all('*', (_req, res) => {
  res.status(405).json({ error: 'Invalid method.' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
