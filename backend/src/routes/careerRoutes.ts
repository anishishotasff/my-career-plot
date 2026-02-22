import { Router } from 'express';
import { analyzeCareerProfile } from '../controllers/careerController';

const router = Router();

router.post('/career', analyzeCareerProfile);

export default router;
