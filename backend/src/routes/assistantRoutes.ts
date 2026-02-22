import express from 'express';
import { chatWithAssistant } from '../controllers/assistantController';

const router = express.Router();

// POST /api/assistant/chat - Chat with AI assistant
router.post('/chat', chatWithAssistant);

export default router;
