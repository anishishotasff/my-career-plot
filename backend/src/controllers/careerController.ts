import { Request, Response } from 'express';
import { analyzeCareer } from '../services/aiService';
import { UserProfile } from '../types';

export const analyzeCareerProfile = async (req: Request, res: Response) => {
  try {
    console.log('📝 Received career analysis request');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const profile: UserProfile = req.body;

    // Validation
    if (!profile.skills || !Array.isArray(profile.skills) || profile.skills.length === 0) {
      console.error('❌ Validation failed: Skills array is required');
      return res.status(400).json({ error: 'Skills array is required' });
    }
    if (!profile.interests || !Array.isArray(profile.interests)) {
      console.error('❌ Validation failed: Interests array is required');
      return res.status(400).json({ error: 'Interests array is required' });
    }
    if (!profile.education) {
      console.error('❌ Validation failed: Education is required');
      return res.status(400).json({ error: 'Education is required' });
    }

    console.log('✅ Validation passed, calling AI service...');
    const result = await analyzeCareer(profile);
    
    // Validate response structure
    if (!result.career_matches || result.career_matches.length !== 3) {
      console.error('❌ Invalid response structure from AI service');
      throw new Error('Invalid career matches response');
    }

    console.log('✅ Career analysis successful');
    res.json(result);
  } catch (error: any) {
    console.error('❌ Career analysis error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to analyze career profile',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
