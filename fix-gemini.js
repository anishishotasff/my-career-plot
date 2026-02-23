const fs = require('fs');

const filePath = 'backend/src/config/gemini.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the listModels section
const before = `    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    
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
    
    // Try different model names in order of preference`;

const after = `    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    
    // Try different model names in order of preference`;

content = content.replace(before, after);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed gemini.ts - removed listModels() call');
