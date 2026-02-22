# Demo Data for Testing

## 🎯 Sample User Profiles

### Profile 1: Web Developer
```json
{
  "skills": ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git"],
  "interests": ["Web Development", "UI/UX Design", "Frontend"],
  "education": "Bachelor's Degree",
  "workType": "Remote",
  "salaryExpectation": "6-10 LPA",
  "location": "India"
}
```

### Profile 2: Data Scientist
```json
{
  "skills": ["Python", "Machine Learning", "SQL", "Statistics", "Pandas", "NumPy"],
  "interests": ["Data Analysis", "AI", "Research"],
  "education": "Master's Degree",
  "workType": "Hybrid",
  "salaryExpectation": "10-15 LPA",
  "location": "India"
}
```

### Profile 3: Mobile Developer
```json
{
  "skills": ["React Native", "JavaScript", "Firebase", "REST APIs"],
  "interests": ["Mobile Apps", "Startups", "Product Development"],
  "education": "Bachelor's Degree",
  "workType": "Office",
  "salaryExpectation": "8-12 LPA",
  "location": "India"
}
```

### Profile 4: DevOps Engineer
```json
{
  "skills": ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD", "Terraform"],
  "interests": ["Cloud Computing", "Automation", "Infrastructure"],
  "education": "Bachelor's Degree",
  "workType": "Remote",
  "salaryExpectation": "12-18 LPA",
  "location": "India"
}
```

### Profile 5: UI/UX Designer
```json
{
  "skills": ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
  "interests": ["Design", "User Experience", "Visual Design"],
  "education": "Bachelor's Degree",
  "workType": "Hybrid",
  "salaryExpectation": "5-8 LPA",
  "location": "India"
}
```

---

## 📄 Sample Resume Texts

### Resume 1: Software Developer
```
John Doe
Software Developer

EXPERIENCE:
- Developed web applications using React and Node.js
- Built RESTful APIs with Express.js
- Implemented authentication using JWT
- Worked with MongoDB and PostgreSQL databases
- Collaborated with cross-functional teams using Agile methodology

SKILLS:
JavaScript, React, Node.js, Express, MongoDB, Git, HTML, CSS

EDUCATION:
Bachelor of Technology in Computer Science
XYZ University, 2020

PROJECTS:
- E-commerce Platform: Built full-stack application with payment integration
- Task Management App: Created React-based productivity tool
```

### Resume 2: Data Analyst
```
Jane Smith
Data Analyst

EXPERIENCE:
- Analyzed large datasets using Python and SQL
- Created data visualizations with Tableau and Power BI
- Performed statistical analysis and A/B testing
- Built predictive models using scikit-learn
- Automated reporting processes with Python scripts

SKILLS:
Python, SQL, Tableau, Excel, Statistics, Pandas, NumPy

EDUCATION:
Master of Science in Data Science
ABC University, 2021

PROJECTS:
- Sales Forecasting Model: Predicted quarterly sales with 85% accuracy
- Customer Segmentation: Performed clustering analysis on 100K+ customers
```

### Resume 3: Fresh Graduate
```
Alex Kumar
Recent Graduate

EDUCATION:
Bachelor of Engineering in Computer Science
DEF College, 2024

SKILLS:
Java, Python, C++, Data Structures, Algorithms

INTERNSHIP:
Software Development Intern at Tech Startup (3 months)
- Assisted in bug fixing and testing
- Learned version control with Git
- Participated in code reviews

PROJECTS:
- Library Management System: Java-based desktop application
- Weather App: Android app using OpenWeatherMap API
- Portfolio Website: Personal website using HTML, CSS, JavaScript

CERTIFICATIONS:
- Introduction to Programming (Coursera)
- Web Development Bootcamp (Udemy)
```

---

## 🎯 Expected Career Matches

### For Web Developer Profile:
1. **Full Stack Developer** (85-90%)
   - High market demand
   - Low automation risk
   - Entry: 6-8 LPA
   - 5-year: 15-25 LPA

2. **Frontend Developer** (80-85%)
   - High market demand
   - Low automation risk
   - Entry: 5-7 LPA
   - 5-year: 12-20 LPA

3. **React Developer** (75-80%)
   - High market demand
   - Low automation risk
   - Entry: 6-9 LPA
   - 5-year: 14-22 LPA

### For Data Scientist Profile:
1. **Data Scientist** (90-95%)
   - High market demand
   - Low automation risk
   - Entry: 8-12 LPA
   - 5-year: 20-35 LPA

2. **Machine Learning Engineer** (85-90%)
   - High market demand
   - Low automation risk
   - Entry: 10-15 LPA
   - 5-year: 25-40 LPA

3. **Data Analyst** (75-80%)
   - Medium market demand
   - Medium automation risk
   - Entry: 5-8 LPA
   - 5-year: 12-18 LPA

---

## 🗺️ Sample Roadmap Structure

### Full Stack Developer Roadmap

**Phase 1 (0-3 months):**
- Focus: Frontend Fundamentals
- Skills: HTML5, CSS3, JavaScript ES6+, React Basics
- Resources: freeCodeCamp, MDN Web Docs, React Documentation

**Phase 2 (3-6 months):**
- Focus: Backend Development
- Skills: Node.js, Express.js, MongoDB, REST APIs
- Resources: Node.js Documentation, MongoDB University, YouTube

**Phase 3 (6-12 months):**
- Focus: Full Stack Integration
- Skills: Authentication, Deployment, Testing, DevOps Basics
- Resources: Heroku, Vercel, Jest Documentation

**Certifications:**
- Meta Front-End Developer Certificate
- MongoDB Developer Certification
- AWS Certified Cloud Practitioner

**Project Ideas:**
1. Social Media Platform with real-time chat
2. E-commerce website with payment gateway
3. Project management tool with team collaboration

---

## 📊 Sample ATS Scores

### High Score (75-90):
- Resume has relevant keywords
- Clear structure and formatting
- Quantifiable achievements
- Relevant skills for target role

### Medium Score (50-74):
- Some relevant keywords missing
- Could improve formatting
- Needs more specific achievements
- Some skill gaps

### Low Score (0-49):
- Many missing keywords
- Poor formatting
- Generic descriptions
- Significant skill gaps

---

## 🧪 Quick Test Commands

### Test Career Analysis (cURL)
```bash
curl -X POST http://localhost:5000/api/career \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Web Development"],
  "education": "Bachelor's Degree",
  "workType": "Remote",
  "salaryExpectation": "6-10 LPA",
  "location": "India"
}
EOF
```

### Test Roadmap (cURL)
```bash
curl -X POST http://localhost:5000/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{"careerName": "Full Stack Developer"}'
```

### Test Resume Analysis (cURL)
```bash
curl -X POST http://localhost:5000/api/resume \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "resumeText": "Software Developer with 2 years experience in React and Node.js. Built multiple web applications. Skills: JavaScript, React, Node.js, MongoDB, Git.",
  "targetCareer": "Full Stack Developer"
}
EOF
```

---

## 💡 Testing Tips

1. **Start with Profile 1** (Web Developer) - most common use case
2. **Test error cases** - empty fields, invalid data
3. **Check loading states** - ensure spinners appear
4. **Verify JSON responses** - no markdown in API responses
5. **Test on mobile** - responsive design is critical
6. **Check console** - no errors should appear
7. **Test navigation** - all routes should work
8. **Verify data persistence** - localStorage should work

---

## 🎬 Demo Script for Presentation

1. **Landing Page** (10 seconds)
   - "Welcome to CareerPilot AI - your intelligent career guidance platform"

2. **Profile Form** (30 seconds)
   - "Let me show you how it works with a sample profile"
   - Fill in Web Developer profile
   - Click Analyze

3. **Dashboard** (45 seconds)
   - "Here are the top 3 career matches based on AI analysis"
   - Point out match percentage, salary, demand
   - "Notice the skill gap analysis"

4. **Roadmap** (30 seconds)
   - Click View Roadmap
   - "Here's a personalized 12-month learning path"
   - Show phases, certifications, projects

5. **Resume Analyzer** (30 seconds)
   - Navigate to Resume Analyzer
   - Paste sample resume
   - "Get instant ATS score and improvement suggestions"

6. **Closing** (15 seconds)
   - "All powered by OpenAI's GPT models"
   - "Designed specifically for the Indian job market"

**Total Demo Time: ~2.5 minutes**

---

Use this data to quickly test and demonstrate the platform! 🚀
