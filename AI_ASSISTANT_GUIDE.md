# 🤖 AI Assistant - User Guide

## Overview
The AI Assistant is a floating chatbot available on all pages of My Career Plot. It provides instant career guidance, job search tips, and personalized advice.

## Features

### 1. Career Guidance
- Career path suggestions based on skills and interests
- Industry insights and trends
- Career transition advice

### 2. Job Search Help
- Job search strategies
- Application tips
- Networking advice
- Platform feature guidance

### 3. Resume Writing
- ATS-friendly resume tips
- Content optimization
- Formatting guidelines
- Achievement quantification

### 4. Interview Preparation
- Common interview questions
- STAR method examples
- Company research tips
- Follow-up strategies

### 5. Skill Development
- Learning resource recommendations
- Certification suggestions
- Practice platform guidance
- Learning strategies

### 6. Salary Guidance
- Indian market salary ranges
- Negotiation tips
- Factors affecting compensation
- Total compensation analysis

## How to Use

1. **Open the Assistant**
   - Click the floating chat button (bottom-right corner)
   - Available on all pages

2. **Ask Questions**
   - Type your question in the input field
   - Press Enter or click Send
   - Get instant responses

3. **Example Questions**
   - "How do I write a good resume?"
   - "What salary should I expect as a fresher?"
   - "Help me prepare for an interview"
   - "What skills should I learn for data science?"
   - "How do I find jobs in my field?"

4. **Context-Aware**
   - The assistant remembers your last 5 messages
   - Provides personalized follow-up responses
   - Maintains conversation flow

## Technical Details

### API Endpoint
```
POST /api/assistant/chat
```

### Request Body
```json
{
  "message": "Your question here",
  "history": [
    {
      "text": "Previous message",
      "sender": "user"
    }
  ]
}
```

### Response
```json
{
  "success": true,
  "response": "Assistant's response",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Mock AI Responses

The assistant currently uses Mock AI (for testing) which provides:
- Instant responses (1 second delay)
- Comprehensive career advice
- No API costs
- Realistic, helpful content

### Response Categories
1. **Resume/CV queries** - ATS tips, formatting, content
2. **Job/Career queries** - Search strategies, planning
3. **Interview queries** - Preparation, questions, follow-up
4. **Salary queries** - Market rates, negotiation
5. **Skill queries** - Learning resources, certifications
6. **General queries** - Platform features, guidance

## Fallback Responses

If the AI service is unavailable, the assistant provides:
- Quick tips based on query keywords
- Platform feature recommendations
- Helpful guidance to continue

## Best Practices

### For Users
- Ask specific questions for better responses
- Provide context when needed
- Use follow-up questions to dive deeper
- Explore platform features mentioned

### For Developers
- Keep responses concise (under 500 words)
- Use bullet points for readability
- Include actionable advice
- Reference platform features
- Maintain friendly, supportive tone

## Future Enhancements

- [ ] Real-time typing indicators
- [ ] Voice input support
- [ ] Multi-language support
- [ ] Conversation history save
- [ ] Export chat transcripts
- [ ] Suggested questions
- [ ] Rich media responses (images, links)
- [ ] Integration with user profile data

## Troubleshooting

### Assistant not responding
1. Check if backend is running (port 5000)
2. Check browser console for errors
3. Verify API endpoint is accessible
4. Check network tab for failed requests

### Slow responses
- Mock AI has 1 second delay (intentional)
- Real AI may take 2-5 seconds
- Check network connection

### Generic responses
- Try more specific questions
- Provide more context
- Use keywords like "resume", "interview", "salary"

## Support

For issues or suggestions:
- Check console logs for errors
- Verify backend is running
- Test API endpoint directly
- Review error messages in response
