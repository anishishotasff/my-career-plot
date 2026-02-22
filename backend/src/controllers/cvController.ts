import { Request, Response } from 'express';
import { enhanceCVWithAI, generateCVPDF, getSuggestions } from '../services/cvService';

export const enhanceCV = async (req: Request, res: Response) => {
  try {
    const cvData = req.body;

    if (!cvData.personalInfo || !cvData.personalInfo.fullName) {
      return res.status(400).json({
        success: false,
        message: 'Personal information is required',
      });
    }

    console.log('🎨 Enhancing CV with AI...');

    const enhancedData = await enhanceCVWithAI(cvData);

    res.json({
      success: true,
      enhancedData,
    });
  } catch (error: any) {
    console.error('Error enhancing CV:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to enhance CV',
      error: error.message,
    });
  }
};

export const generateCV = async (req: Request, res: Response) => {
  try {
    const cvData = req.body;

    if (!cvData.personalInfo || !cvData.personalInfo.fullName) {
      return res.status(400).json({
        success: false,
        message: 'Personal information is required',
      });
    }

    console.log('📄 Generating CV PDF...');

    const cvUrl = await generateCVPDF(cvData);

    res.json({
      success: true,
      cvUrl: `http://localhost:5000${cvUrl}`,
      message: 'CV generated successfully',
    });
  } catch (error: any) {
    console.error('Error generating CV:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate CV',
      error: error.message,
    });
  }
};

export const getCVSuggestions = async (req: Request, res: Response) => {
  try {
    const { text, context } = req.body;

    if (!text || text.length < 3) {
      return res.json({
        success: true,
        suggestions: [],
      });
    }

    console.log('💡 Generating suggestions for:', text.substring(0, 30) + '...');

    const suggestions = await getSuggestions(text, context);

    res.json({
      success: true,
      suggestions,
    });
  } catch (error: any) {
    console.error('Error getting suggestions:', error);
    res.json({
      success: true,
      suggestions: [],
    });
  }
};
