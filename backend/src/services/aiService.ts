import { callGeminiAPI } from '../config/gemini';
import { UserProfile, CareerResponse, RoadmapResponse, ResumeAnalysis } from '../types';

const parseJSONResponse = async (content: string, retryCount = 0): Promise<any> => {
  try {
    // Remove markdown code blocks if present
    const cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    return JSON.parse(cleanContent);
  } catch (error) {
    if (retryCount < 1) {
      console.warn('JSON parsing failed, attempting to extract JSON...');
      // Try to extract JSON from text
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          throw new Error('Failed to parse JSON response from AI');
        }
      }
    }
    throw new Error('Failed to parse JSON response from AI');
  }
};

export const analyzeCareer = async (profile: UserProfile): Promise<CareerResponse> => {
  const systemPrompt = `You are a professional AI career intelligence system specializing in Indian job market analytics. You must return structured JSON only. No markdown, no explanations, just pure JSON.`;

  const userPrompt = `Analyze the following profile:
Skills: ${profile.skills.join(', ')}
Interests: ${profile.interests.join(', ')}
Education: ${profile.education}
Work Type: ${profile.workType}
Salary Expectation: ${profile.salaryExpectation}
Location: India

Return JSON in this exact structure:
{
  "career_matches": [
    {
      "career_name": "",
      "match_percentage": 0,
      "why_match": "",
      "required_skills": [],
      "skill_gap": [],
      "entry_salary_india": "",
      "five_year_projection": "",
      "market_demand": "",
      "automation_risk": ""
    }
  ]
}

Return exactly 3 career matches. Ensure match_percentage is between 0-100, market_demand is one of [Low, Medium, High], and automation_risk is one of [Low, Medium, High].`;

  try {
    const content = await callGeminiAPI(systemPrompt, userPrompt);

    if (!content) {
      throw new Error('No response from Gemini API');
    }

    const parsed = await parseJSONResponse(content);
    return parsed as CareerResponse;
  } catch (error: any) {
    console.error('Career analysis error:', error);
    throw new Error(`Career analysis failed: ${error.message}`);
  }
};

export const generateRoadmap = async (careerName: string): Promise<RoadmapResponse> => {
  const systemPrompt = `You are a structured career roadmap generator. Return only valid JSON. No markdown, no explanations, just pure JSON.`;

  const userPrompt = `Create a detailed 12-month roadmap for becoming a ${careerName} in India.

Return JSON in this exact structure:
{
  "roadmap": {
    "phase_1": {
      "duration": "0-3 months",
      "focus": "",
      "skills": [],
      "resources": []
    },
    "phase_2": {
      "duration": "3-6 months",
      "focus": "",
      "skills": [],
      "resources": []
    },
    "phase_3": {
      "duration": "6-12 months",
      "focus": "",
      "skills": [],
      "resources": []
    },
    "certifications": [],
    "project_ideas": []
  }
}

Provide 3-5 skills per phase, 3-4 free resources (platform names only like Coursera, YouTube, freeCodeCamp), 3-5 certifications, and exactly 3 project ideas.`;

  try {
    const content = await callGeminiAPI(systemPrompt, userPrompt);

    if (!content) {
      throw new Error('No response from Gemini API');
    }

    const parsed = await parseJSONResponse(content);
    return parsed as RoadmapResponse;
  } catch (error: any) {
    console.error('Roadmap generation error:', error);
    throw new Error(`Roadmap generation failed: ${error.message}`);
  }
};

export const analyzeResume = async (
  resumeText: string,
  targetCareer: string
): Promise<ResumeAnalysis> => {
  const systemPrompt = `You are an ATS resume evaluation engine. Return JSON only. No markdown, no explanations, just pure JSON.`;

  const userPrompt = `Analyze this resume for ${targetCareer}:

${resumeText}

Return JSON in this exact structure:
{
  "detected_skills": [],
  "missing_skills": [],
  "ats_score": 0,
  "keyword_suggestions": [],
  "improvement_points": []
}

Provide 5-10 detected skills, 5-8 missing skills for ${targetCareer}, ATS score between 0-100, 5-7 keyword suggestions, and 5-7 improvement points.`;

  try {
    const content = await callGeminiAPI(systemPrompt, userPrompt);

    if (!content) {
      throw new Error('No response from Gemini API');
    }

    const parsed = await parseJSONResponse(content);
    return parsed as ResumeAnalysis;
  } catch (error: any) {
    console.error('Resume analysis error:', error);
    throw new Error(`Resume analysis failed: ${error.message}`);
  }
};
