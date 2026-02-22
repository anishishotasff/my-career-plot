import { Request, Response } from 'express';
import { analyzeResume } from '../services/aiService';

export const analyzeResumeFile = async (req: Request, res: Response) => {
  try {
    const { resumeText, targetCareer } = req.body;

    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({ error: 'Resume text is required' });
    }
    if (!targetCareer || typeof targetCareer !== 'string') {
      return res.status(400).json({ error: 'Target career is required' });
    }

    const result = await analyzeResume(resumeText, targetCareer);
    
    // Validate response structure
    if (!result.detected_skills || !result.ats_score) {
      throw new Error('Invalid resume analysis response');
    }

    res.json(result);
  } catch (error: any) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      message: error.message 
    });
  }
};
