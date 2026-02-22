import { Request, Response } from 'express';
import { getAssistantResponse } from '../services/assistantService';

export const chatWithAssistant = async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    console.log('💬 Assistant query:', message.substring(0, 50) + '...');

    const response = await getAssistantResponse(message, history);

    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Assistant error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get assistant response',
      error: error.message,
    });
  }
};
