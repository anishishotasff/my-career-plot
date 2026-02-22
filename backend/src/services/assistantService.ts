import { callGeminiAPI } from '../config/gemini';

interface ChatMessage {
  text: string;
  sender: 'user' | 'assistant';
}

export const getAssistantResponse = async (
  userMessage: string,
  history: ChatMessage[] = []
): Promise<string> => {
  const systemPrompt = `You are a helpful Career Assistant for "My Career Plot" - an AI-powered career guidance platform in India. Your role is to help users with:

1. Career Guidance: Suggest career paths based on interests, skills, and goals
2. Job Search Tips: Provide advice on finding jobs, networking, and applications
3. Resume Writing: Help with resume structure, content, and ATS optimization
4. Interview Preparation: Share interview tips, common questions, and best practices
5. Skill Development: Recommend skills to learn and resources
6. Industry Insights: Share information about different industries and roles
7. Salary Guidance: Provide realistic salary expectations for Indian market
8. Education Advice: Suggest courses, certifications, and degrees

Guidelines:
- Be friendly, supportive, and encouraging
- Provide specific, actionable advice
- Use Indian context (LPA for salary, Indian companies, etc.)
- Keep responses concise but informative
- If asked about platform features, guide users to:
  * Profile Analysis for career matching
  * Jobs section for opportunities
  * Resume Analyzer for resume improvement
  * Roadmap View for learning paths
- For complex queries, break down advice into steps
- Always be positive and motivating

Respond in a conversational, helpful tone.`;

  // Build conversation context
  let conversationContext = '';
  if (history.length > 0) {
    conversationContext = '\n\nPrevious conversation:\n';
    history.forEach((msg) => {
      conversationContext += `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
    });
  }

  const userPrompt = `${conversationContext}\n\nUser: ${userMessage}\n\nAssistant:`;

  try {
    const response = await callGeminiAPI(systemPrompt, userPrompt);
    return response.trim();
  } catch (error: any) {
    console.error('Assistant error:', error);
    
    // Fallback responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return `Great question about resumes! Here are some key tips:

• Use a clean, ATS-friendly format
• Start with a strong summary highlighting your key skills
• Quantify achievements with numbers and metrics
• Tailor your resume for each job application
• Include relevant keywords from the job description
• Keep it to 1-2 pages maximum

Try our Resume Analyzer tool to get detailed feedback on your resume!`;
    }
    
    if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return `I can help you with your career journey! Here's what I suggest:

• Use our Profile Analysis to discover careers that match your skills
• Check the Jobs section for latest opportunities across all industries
• Build a strong LinkedIn profile and network actively
• Tailor your applications to each role
• Prepare thoroughly for interviews

What specific aspect would you like to focus on?`;
    }
    
    if (lowerMessage.includes('interview')) {
      return `Interview preparation is crucial! Here are my top tips:

• Research the company thoroughly
• Practice common interview questions
• Prepare STAR method examples (Situation, Task, Action, Result)
• Dress professionally and arrive early
• Ask thoughtful questions about the role
• Follow up with a thank-you email

Would you like specific tips for any type of interview?`;
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('lpa')) {
      return `Salary expectations in India vary by role, experience, and location. Here's a general guide:

• Entry-level (0-2 years): 3-6 LPA
• Mid-level (3-5 years): 6-12 LPA
• Senior (5-10 years): 12-25 LPA
• Leadership (10+ years): 25+ LPA

These vary significantly by:
- Industry (Tech, Finance pay higher)
- Location (Metro cities pay more)
- Company size (MNCs vs startups)
- Your specific skills and expertise

Use our Career Analysis tool to get salary insights for specific roles!`;
    }
    
    return `I'm here to help with your career! I can assist with:

• Career planning and guidance
• Job search strategies
• Resume and interview tips
• Skill development advice
• Industry insights

What would you like to know more about?`;
  }
};
