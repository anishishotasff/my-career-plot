import { Request, Response } from 'express';
import { generateRoadmap } from '../services/aiService';

export const createRoadmap = async (req: Request, res: Response) => {
  try {
    const { careerName } = req.body;

    if (!careerName || typeof careerName !== 'string') {
      return res.status(400).json({ error: 'Career name is required' });
    }

    const result = await generateRoadmap(careerName);
    
    // Validate response structure
    if (!result.roadmap || !result.roadmap.phase_1) {
      throw new Error('Invalid roadmap response');
    }

    res.json(result);
  } catch (error: any) {
    console.error('Roadmap generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate roadmap',
      message: error.message 
    });
  }
};
