// Mock AI for testing - returns sample data instantly

export const callMockAI = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  console.log('🎭 Using Mock AI (for testing)');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Detect which type of request this is
  if (userPrompt.includes('Analyze the following profile')) {
    // Career matching response
    return JSON.stringify({
      "career_matches": [
        {
          "career_name": "Full Stack Developer",
          "match_percentage": 88,
          "why_match": "Your skills in JavaScript and React align perfectly with full-stack development. The combination of frontend and backend technologies makes you an ideal candidate for this role.",
          "required_skills": ["JavaScript", "React", "Node.js", "MongoDB", "REST APIs", "Git"],
          "skill_gap": ["MongoDB", "REST APIs"],
          "entry_salary_india": "6-8 LPA",
          "five_year_projection": "15-25 LPA",
          "market_demand": "High",
          "automation_risk": "Low"
        },
        {
          "career_name": "Frontend Developer",
          "match_percentage": 85,
          "why_match": "Your strong foundation in React and JavaScript makes you well-suited for frontend development. Your interest in web development aligns with this career path.",
          "required_skills": ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Redux"],
          "skill_gap": ["TypeScript", "Redux"],
          "entry_salary_india": "5-7 LPA",
          "five_year_projection": "12-20 LPA",
          "market_demand": "High",
          "automation_risk": "Low"
        },
        {
          "career_name": "React Developer",
          "match_percentage": 82,
          "why_match": "Your expertise in React positions you well for specialized React development roles. Companies are actively seeking React specialists for modern web applications.",
          "required_skills": ["React", "JavaScript", "Redux", "Next.js", "Testing"],
          "skill_gap": ["Next.js", "Testing"],
          "entry_salary_india": "6-9 LPA",
          "five_year_projection": "14-22 LPA",
          "market_demand": "High",
          "automation_risk": "Low"
        }
      ]
    });
  } else if (userPrompt.includes('Create a detailed 12-month roadmap')) {
    // Roadmap generation response
    // Extract career name for potential future use
    userPrompt.match(/becoming a (.+?) in India/);
    
    return JSON.stringify({
      "roadmap": {
        "phase_1": {
          "duration": "0-3 months",
          "focus": "Foundation Building",
          "skills": ["Core JavaScript", "HTML5 & CSS3", "Git & GitHub", "Basic React", "Responsive Design"],
          "resources": [
            { "name": "freeCodeCamp", "url": "https://www.freecodecamp.org/" },
            { "name": "MDN Web Docs", "url": "https://developer.mozilla.org/" },
            { "name": "YouTube - Traversy Media", "url": "https://www.youtube.com/@TraversyMedia" },
            { "name": "Codecademy", "url": "https://www.codecademy.com/" }
          ]
        },
        "phase_2": {
          "duration": "3-6 months",
          "focus": "Advanced Development",
          "skills": ["Advanced React", "State Management", "REST APIs", "Node.js Basics", "Database Fundamentals"],
          "resources": [
            { "name": "React Documentation", "url": "https://react.dev/" },
            { "name": "Udemy", "url": "https://www.udemy.com/" },
            { "name": "Coursera", "url": "https://www.coursera.org/" },
            { "name": "Scrimba", "url": "https://scrimba.com/" }
          ]
        },
        "phase_3": {
          "duration": "6-12 months",
          "focus": "Professional Skills",
          "skills": ["Full Stack Integration", "Testing", "Deployment", "CI/CD", "System Design"],
          "resources": [
            { "name": "Vercel Docs", "url": "https://vercel.com/docs" },
            { "name": "Netlify", "url": "https://www.netlify.com/" },
            { "name": "GitHub Actions", "url": "https://github.com/features/actions" },
            { "name": "LeetCode", "url": "https://leetcode.com/" }
          ]
        },
        "certifications": [
          "Meta Front-End Developer Certificate",
          "AWS Certified Cloud Practitioner",
          "MongoDB Developer Certification",
          "Google Cloud Associate",
          "Microsoft Azure Fundamentals"
        ],
        "project_ideas": [
          "Build a full-stack e-commerce platform with payment integration",
          "Create a real-time chat application with WebSocket",
          "Develop a project management tool with team collaboration features"
        ]
      }
    });
  } else if (userPrompt.includes('Analyze this resume')) {
    // Resume analysis response - calculate dynamic ATS score based on content
    const resumeText = userPrompt.toLowerCase();
    let atsScore = 50; // Base score
    
    // Check for key elements that improve ATS score
    if (resumeText.includes('experience') || resumeText.includes('worked')) atsScore += 10;
    if (resumeText.includes('project') || resumeText.includes('developed')) atsScore += 8;
    if (resumeText.includes('education') || resumeText.includes('degree')) atsScore += 7;
    if (resumeText.includes('skill') || resumeText.includes('technology')) atsScore += 10;
    if (resumeText.includes('achievement') || resumeText.includes('improved')) atsScore += 8;
    if (resumeText.includes('team') || resumeText.includes('collaboration')) atsScore += 5;
    if (resumeText.includes('github') || resumeText.includes('portfolio')) atsScore += 7;
    
    // Cap at 95 (perfect scores are rare)
    atsScore = Math.min(atsScore, 95);
    
    return JSON.stringify({
      "detected_skills": ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git", "MongoDB", "Express", "Problem Solving", "Communication"],
      "missing_skills": ["TypeScript", "Testing (Jest/Mocha)", "Docker", "AWS/Cloud", "CI/CD", "System Design", "Microservices", "GraphQL"],
      "ats_score": atsScore,
      "keyword_suggestions": ["TypeScript", "Jest", "React Testing Library", "AWS Lambda", "Docker", "Kubernetes", "Agile/Scrum"],
      "improvement_points": [
        "Add quantifiable achievements with metrics (e.g., 'Improved performance by 40%', 'Reduced load time by 2 seconds')",
        "Include TypeScript experience - it's highly sought after in modern development roles",
        "Add testing frameworks and methodologies (Jest, React Testing Library, TDD)",
        "Mention cloud platform experience (AWS, Azure, or GCP) with specific services used",
        "Include soft skills like team collaboration, leadership, and communication",
        "Add links to GitHub portfolio with live project demos",
        "Use strong action verbs at the start of bullet points (Developed, Implemented, Optimized, Led)"
      ]
    });
  } else if (userPrompt.includes('Assistant:') || systemPrompt.includes('Career Assistant')) {
    // AI Assistant chat response
    const userMessage = userPrompt.toLowerCase();
    
    if (userMessage.includes('resume') || userMessage.includes('cv')) {
      return `Great question about resumes! Here are some key tips for creating an ATS-friendly resume:

✓ Use a clean, simple format without tables or graphics
✓ Start with a strong professional summary
✓ Quantify your achievements with numbers (e.g., "Increased sales by 30%")
✓ Include relevant keywords from the job description
✓ Use standard section headings (Experience, Education, Skills)
✓ Keep it to 1-2 pages maximum
✓ Save as .docx or .pdf format

Try our Resume Analyzer tool to get a detailed ATS score and personalized feedback on your resume!`;
    }
    
    if (userMessage.includes('job') || userMessage.includes('career') || userMessage.includes('work')) {
      return `I can definitely help you with your career journey! Here's my advice:

🎯 Career Planning:
• Use our Profile Analysis to discover careers matching your skills
• Check the Jobs section for latest opportunities across all industries
• Build a strong online presence (LinkedIn, GitHub for tech roles)

📝 Job Search Strategy:
• Tailor your resume for each application
• Network actively - 70% of jobs are filled through networking
• Apply to 10-15 jobs per week consistently
• Follow up on applications after 1 week

💼 Interview Prep:
• Research the company thoroughly
• Practice STAR method for behavioral questions
• Prepare 3-5 questions to ask the interviewer

What specific aspect would you like to focus on?`;
    }
    
    if (userMessage.includes('interview')) {
      return `Interview preparation is crucial for success! Here's a comprehensive guide:

🎯 Before the Interview:
• Research the company, its products, and recent news
• Review the job description and match your experience
• Prepare 5-7 STAR method examples
• Practice common questions with a friend
• Plan your outfit and route (arrive 10-15 mins early)

💬 During the Interview:
• Make eye contact and smile
• Listen carefully before answering
• Use specific examples from your experience
• Ask thoughtful questions about the role and team
• Show enthusiasm for the opportunity

📧 After the Interview:
• Send a thank-you email within 24 hours
• Reiterate your interest in the role
• Follow up after 1 week if no response

Would you like tips for any specific type of interview (technical, behavioral, HR)?`;
    }
    
    if (userMessage.includes('salary') || userMessage.includes('lpa') || userMessage.includes('pay')) {
      return `Salary expectations in India vary by role, experience, and location. Here's a realistic guide:

💰 By Experience Level:
• Entry-level (0-2 years): 3-6 LPA
• Mid-level (3-5 years): 6-15 LPA
• Senior (5-10 years): 15-30 LPA
• Leadership (10+ years): 30+ LPA

📊 Factors Affecting Salary:
• Industry (Tech, Finance, Consulting pay higher)
• Location (Bangalore, Mumbai, Delhi pay 20-30% more)
• Company size (MNCs typically pay more than startups)
• Your specific skills and expertise
• Negotiation skills

💡 Negotiation Tips:
• Research market rates on Glassdoor, AmbitionBox
• Know your worth - list your achievements
• Consider total compensation (bonus, stocks, benefits)
• Be prepared to justify your ask with data
• Don't accept the first offer immediately

Use our Career Analysis tool to get salary insights for specific roles!`;
    }
    
    if (userMessage.includes('skill') || userMessage.includes('learn') || userMessage.includes('course')) {
      return `Skill development is key to career growth! Here's how to approach it:

🎯 Identify Skills to Learn:
• Check job descriptions for your target role
• Use our Career Matching tool to find skill gaps
• Focus on high-demand skills in your industry

📚 Learning Resources:
• Free: YouTube, freeCodeCamp, Coursera (audit mode)
• Paid: Udemy, Pluralsight, LinkedIn Learning
• Practice: LeetCode, HackerRank, GitHub projects

⏰ Learning Strategy:
• Dedicate 1-2 hours daily consistently
• Build projects to apply what you learn
• Join communities (Discord, Reddit, LinkedIn groups)
• Share your learning journey on social media

🏆 Certifications Worth Pursuing:
• Tech: AWS, Google Cloud, Microsoft Azure
• Data: Google Data Analytics, IBM Data Science
• Business: Google Project Management, HubSpot
• Design: Google UX Design, Adobe Certified

Check our Roadmap View for structured learning paths!`;
    }
    
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      return `Hello! 👋 I'm your Career Assistant, here to help you succeed!

I can assist you with:
• 🎯 Career planning and guidance
• 💼 Job search strategies
• 📝 Resume and cover letter tips
• 🎤 Interview preparation
• 📚 Skill development advice
• 💰 Salary negotiation tips
• 🏢 Industry insights

What would you like to know more about today?`;
    }
    
    // Default response
    return `I'm here to help with your career! I can provide guidance on:

• Career planning and path selection
• Job search and application strategies
• Resume writing and optimization
• Interview preparation and tips
• Skill development and learning resources
• Salary expectations and negotiation
• Industry trends and insights

You can also explore our platform features:
• Profile Analysis - Find careers matching your skills
• Jobs Section - Browse latest opportunities
• Resume Analyzer - Get ATS score and feedback
• Roadmap View - Structured learning paths

What specific area would you like help with?`;
  }
  
  // Default response
  return JSON.stringify({
    "error": "Unknown request type"
  });
};
