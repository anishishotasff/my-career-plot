import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import careerRoutes from './routes/careerRoutes';
import roadmapRoutes from './routes/roadmapRoutes';
import resumeRoutes from './routes/resumeRoutes';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import assistantRoutes from './routes/assistantRoutes';
import cvRoutes from './routes/cvRoutes';
import { errorHandler } from './middleware/errorHandler';
import { initializeJobCache, scheduleDailyJobUpdate } from './services/jobScraperService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (for CV downloads)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', careerRoutes);
app.use('/api', roadmapRoutes);
app.use('/api', resumeRoutes);
app.use('/api', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/cv', cvRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, async () => {
  console.log(`🚀 CareerPilot AI Backend running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize job cache on startup
  console.log('🔄 Initializing job scraper...');
  await initializeJobCache();
  
  // Schedule daily job updates
  scheduleDailyJobUpdate();
  console.log('⏰ Daily job update scheduled');
});

export default app;
