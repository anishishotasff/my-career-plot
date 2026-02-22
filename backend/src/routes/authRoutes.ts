import { Router } from 'express';
import { 
  linkedinAuth, 
  linkedinCallback,
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback
} from '../controllers/authController';

const router = Router();

// LinkedIn OAuth
router.get('/auth/linkedin', linkedinAuth);
router.get('/auth/linkedin/callback', linkedinCallback);

// Google OAuth
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleCallback);

// GitHub OAuth
router.get('/auth/github', githubAuth);
router.get('/auth/github/callback', githubCallback);

export default router;
