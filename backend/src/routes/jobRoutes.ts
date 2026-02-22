import express from 'express';
import { getJobListings } from '../controllers/jobController';

const router = express.Router();

// GET /api/jobs - Get job listings with optional filters
router.get('/', getJobListings);

export default router;
