import { Router } from 'express';
import { createRoadmap } from '../controllers/roadmapController';

const router = Router();

router.post('/roadmap', createRoadmap);

export default router;
