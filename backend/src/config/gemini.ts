import { GoogleGenerativeAI } from '@google/generative-ai';
import { callMockAI } from './mockAI';

// Set to true to use mock AI for testing
const USE_MOCK_AI = true;

export const callGeminiAPI = async (systemPrompt: string, userPrompt: string) => {
  // Use mock AI if enabled
  if (USE_MOCK_AI) {
    console.log('🎭 Using Mock AI for testing');
    return await callMockAI(systemPrompt, userPrompt);
  }
  
  // Get API key from environment
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyBz_oohpLwEssvyRnoW-Vrf_Gk5OogDFc0';
  
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'your_google_api_key_here') {
    throw new Error('Google API key not configured. Please add GOOGLE_API_KEY to your .env file');
  }
  
  console.log('✅ Using Real Google AI with key:', GOOGLE_API_KEY.substring(0, 10) + '...');

  try {
    // Initialize client with API key
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    
    // First, try to list available models
    console.log('📋 Checking available models...');
    try {
      const models = await genAI.listModels();
      const availableModels = models.map((m: any) => m.name);
      console.log('✅ Available models:', availableModels);
      
      if (availableModels.length === 0) {
        throw new Error('No models available. Your API key may not have Generative Language API enabled. Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
      }
    } catch (listError: any) {
      console.warn('⚠️ Could not list models:', listError.message);
    }
    
    // Try different model names in order of preference
    const modelNames = [
      'gemini-1.5-flash-8b',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro'
    ];
    
    let lastError;
    
    for (const modelName of modelNames) {
      try {
        console.log(`🔄 Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        });

        const prompt = `${systemPrompt}\n\n${userPrompt}`;
        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(`✅ Success with model: ${modelName}`);

        return text;
      } catch (error: any) {
        console.log(`❌ Failed with ${modelName}: ${error.message}`);
        lastError = error;
        continue;
      }
    }
    
    throw lastError;
    
  } catch (error: any) {
    console.error('❌ Gemini API Error:', error);
    
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key not valid')) {
      throw new Error('Invalid Google API key. Get a new key at: https://aistudio.google.com/app/apikey');
    }
    
    if (error.message?.includes('404') || error.message?.includes('not found')) {
      throw new Error('Generative Language API not enabled. Enable it at: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com then create a NEW API key');
    }
    
    if (error.message?.includes('No models available')) {
      throw error;
    }
    
    throw new Error(`Gemini API failed: ${error.message}`);
  }
};
