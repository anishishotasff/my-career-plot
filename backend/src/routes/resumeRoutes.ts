import { Router } from 'express';
import { analyzeResumeFile } from '../controllers/resumeController';

const router = Router();

router.post('/resume', analyzeResumeFile);

export default router;
