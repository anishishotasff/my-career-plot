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
    const careerMatch = userPrompt.match(/becoming a (.+?) in India/);
    const careerName = careerMatch ? careerMatch[1] : 'Software Developer';
    
    return JSON.stringify({
      "roadmap": {
        "phase_1": {
          "duration": "0-3 months",
          "focus": "Foundation Building",
          "skills": ["Core JavaScript", "HTML5 & CSS3", "Git & GitHub", "Basic React", "Responsive Design"],
          "resources": ["freeCodeCamp", "MDN Web Docs", "YouTube", "Codecademy"]
        },
        "phase_2": {
          "duration": "3-6 months",
          "focus": "Advanced Development",
          "skills": ["Advanced React", "State Management", "REST APIs", "Node.js Basics", "Database Fundamentals"],
          "resources": ["React Documentation", "Udemy", "Coursera", "Scrimba"]
        },
        "phase_3": {
          "duration": "6-12 months",
          "focus": "Professional Skills",
          "skills": ["Full Stack Integration", "Testing", "Deployment", "CI/CD", "System Design"],
          "resources": ["Vercel", "Netlify", "GitHub Actions", "LeetCode"]
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
    // Resume analysis response
    return JSON.stringify({
      "detected_skills": ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git", "MongoDB", "Express"],
      "missing_skills": ["TypeScript", "Testing", "Docker", "AWS", "CI/CD", "System Design", "Microservices"],
      "ats_score": 72,
      "keyword_suggestions": ["TypeScript", "Jest", "React Testing Library", "AWS Lambda", "Docker", "Kubernetes", "Agile"],
      "improvement_points": [
        "Add quantifiable achievements (e.g., 'Improved performance by 40%')",
        "Include TypeScript experience to match modern job requirements",
        "Add testing frameworks and methodologies",
        "Mention cloud platform experience (AWS, Azure, or GCP)",
        "Include soft skills like team collaboration and leadership",
        "Add links to GitHub portfolio and live projects",
        "Use action verbs at the start of bullet points"
      ]
    });
  }
  
  // Default response
  return JSON.stringify({
    "error": "Unknown request type"
  });
};
