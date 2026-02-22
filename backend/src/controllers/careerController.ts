import { Request, Response } from 'express';
import { analyzeCareer } from '../services/aiService';
import { UserProfile } from '../types';

export const analyzeCareerProfile = async (req: Request, res: Response) => {
  try {
    const profile: UserProfile = req.body;

    // Validation
    if (!profile.skills || !Array.isArray(profile.skills) || profile.skills.length === 0) {
      return res.status(400).json({ error: 'Skills array is required' });
    }
    if (!profile.interests || !Array.isArray(profile.interests)) {
      return res.status(400).json({ error: 'Interests array is required' });
    }
    if (!profile.education) {
      return res.status(400).json({ error: 'Education is required' });
    }

    const result = await analyzeCareer(profile);
    
    // Validate response structure
    if (!result.career_matches || result.career_matches.length !== 3) {
      throw new Error('Invalid career matches response');
    }

    res.json(result);
  } catch (error: any) {
    console.error('Career analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze career profile',
      message: error.message 
    });
  }
};
