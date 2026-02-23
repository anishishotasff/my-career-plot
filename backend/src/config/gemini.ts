import { GoogleGenerativeAI } from "@google/generative-ai";
import { callMockAI } from "./mockAI";

const USE_MOCK_AI = true;

export const callGeminiAPI = async (systemPrompt: string, userPrompt: string) => {
  if (USE_MOCK_AI) {
    console.log("Using Mock AI for testing");
    return await callMockAI(systemPrompt, userPrompt);
  }
  
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyBz_oohpLwEssvyRnoW-Vrf_Gk5OogDFc0";
  
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === "your_google_api_key_here") {
    throw new Error("Google API key not configured");
  }
  
  console.log("Using Real Google AI");

  try {
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const modelNames = ["gemini-1.5-flash-8b", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    
    let lastError;
    
    for (const modelName of modelNames) {
      try {
        console.log("Trying model: " + modelName);
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        });

        const prompt = systemPrompt + "\n\n" + userPrompt;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log("Success with model: " + modelName);

        return text;
      } catch (error: any) {
        console.log("Failed with " + modelName + ": " + error.message);
        lastError = error;
        continue;
      }
    }
    
    throw lastError;
    
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("API key not valid")) {
      throw new Error("Invalid Google API key");
    }
    
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      throw new Error("Generative Language API not enabled");
    }
    
    throw new Error("Gemini API failed: " + error.message);
  }
};
