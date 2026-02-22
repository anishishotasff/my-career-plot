import express from 'express';
import { enhanceCV, generateCV, getCVSuggestions } from '../controllers/cvController';

const router = express.Router();

// POST /api/cv/enhance - Enhance CV with AI
router.post('/enhance', enhanceCV);

// POST /api/cv/generate - Generate CV PDF
router.post('/generate', generateCV);

// POST /api/cv/suggestions - Get AI suggestions for form fields
router.post('/suggestions', getCVSuggestions);

export default router;
