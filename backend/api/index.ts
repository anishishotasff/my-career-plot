// Single serverless function for all API routes
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import careerRoutes from '../src/routes/careerRoutes';
import roadmapRoutes from '../src/routes/roadmapRoutes';
import resumeRoutes from '../src/routes/resumeRoutes';
import jobRoutes from '../src/routes/jobRoutes';
import assistantRoutes from '../src/routes/assistantRoutes';
import cvRoutes from '../src/routes/cvRoutes';
import { errorHandler } from '../src/middleware/errorHandler';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://my-career-plot.vercel.app',
    'https://mycareerplot.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', careerRoutes);
app.use('/api', roadmapRoutes);
app.use('/api', resumeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/cv', cvRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
