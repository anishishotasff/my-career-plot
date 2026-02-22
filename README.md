# 🚀 CareerPilot AI - Intelligent Career Roadmap Platform

A production-quality AI-powered career guidance platform built for the Indian job market. Get personalized career recommendations, structured 12-month roadmaps, and resume optimization powered by OpenAI.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-purple)

## ✨ Features

### 🎯 AI Career Matching
- Analyze user skills, interests, and education
- Generate top 3 career matches with percentage scores
- Market demand ratings and automation risk analysis
- Entry-level and 5-year salary projections for India

### 🗺️ 12-Month Roadmap
- Structured learning path in 3 phases
- Skill recommendations per phase
- Free learning resources (Coursera, YouTube, etc.)
- Certification suggestions
- 3 real-world project ideas

### 📄 Resume Analyzer
- ATS compatibility score (0-100)
- Detected vs missing skills
- Keyword optimization suggestions
- Actionable improvement points

### 🎨 Modern UI/UX
- Dark SaaS theme with glassmorphism
- Smooth animations with Framer Motion
- Responsive design
- Neon gradient accents
- Professional typography

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **OpenAI API** (GPT-4)
- **Helmet** for security
- **Rate limiting** for API protection
- **CORS** configuration

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- OpenAI API key

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

**backend/.env:**
```env
PORT=5000
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
careerpilot-ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── openai.ts          # OpenAI configuration
│   │   ├── controllers/
│   │   │   ├── careerController.ts
│   │   │   ├── roadmapController.ts
│   │   │   └── resumeController.ts
│   │   ├── services/
│   │   │   └── aiService.ts       # OpenAI API calls
│   │   ├── routes/
│   │   │   ├── careerRoutes.ts
│   │   │   ├── roadmapRoutes.ts
│   │   │   └── resumeRoutes.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── CareerCard.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RoadmapView.tsx
│   │   │   └── ResumeAnalyzer.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── README.md
```

## 🔌 API Endpoints

### POST `/api/career`
Analyze user profile and return top 3 career matches.

**Request:**
```json
{
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Web Development", "AI"],
  "education": "Bachelor's Degree",
  "workType": "Remote",
  "salaryExpectation": "10-15 LPA",
  "location": "India"
}
```

**Response:**
```json
{
  "career_matches": [
    {
      "career_name": "Full Stack Developer",
      "match_percentage": 92,
      "why_match": "...",
      "required_skills": ["..."],
      "skill_gap": ["..."],
      "entry_salary_india": "₹6-10 LPA",
      "five_year_projection": "₹15-25 LPA",
      "market_demand": "High",
      "automation_risk": "Low"
    }
  ]
}
```

### POST `/api/roadmap`
Generate 12-month learning roadmap.

**Request:**
```json
{
  "careerName": "Full Stack Developer"
}
```

### POST `/api/resume`
Analyze resume for ATS compatibility.

**Request:**
```json
{
  "resumeText": "Your resume content...",
  "targetCareer": "Data Scientist"
}
```

## 🎨 UI Features

- **Glassmorphism cards** with backdrop blur
- **Animated progress bars** for match percentages
- **Color-coded badges** for demand (Green/Yellow/Red)
- **Smooth page transitions** with Framer Motion
- **Responsive design** for mobile/tablet/desktop
- **Dark theme** optimized for readability
- **Gradient text effects** for headings
- **Hover animations** on interactive elements

## 🌐 Deployment

### Backend (Render)

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `cd backend && npm install && npm run build`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:** Add `OPENAI_API_KEY`, `NODE_ENV=production`

### Frontend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy:
```bash
cd frontend
vercel --prod
```
3. Set environment variable:
   - `VITE_API_URL=https://your-backend-url.onrender.com/api`

## 🔐 Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation
- Error handling middleware
- Environment variable protection

## 🎯 Future Enhancements

- [ ] PDF roadmap export
- [ ] Career comparison modal
- [ ] User authentication
- [ ] Save multiple profiles
- [ ] Email notifications
- [ ] LinkedIn integration
- [ ] Job board integration
- [ ] Skill assessment tests

## 📝 License

MIT License - feel free to use this project for your hackathon or portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for the Indian tech community
