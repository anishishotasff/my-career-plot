# CareerPilot AI - Project Overview

## 🎯 Project Description

CareerPilot AI is a production-quality AI-powered career guidance platform specifically designed for the Indian job market. It provides intelligent career matching, personalized roadmaps, and resume analysis using OpenAI's GPT models.

## ✨ Key Features

### 1. Career Matching Engine
- Analyzes user profile (skills, interests, education, work preferences)
- Returns top 3 career matches with:
  - Match percentage (0-100%)
  - Detailed explanation
  - Required skills & skill gap analysis
  - Entry-level salary in India
  - 5-year salary projection
  - Market demand rating (Low/Medium/High)
  - Automation risk assessment

### 2. Personalized Roadmap Generator
- 12-month structured learning path
- 3 phases (0-3, 3-6, 6-12 months)
- Recommended certifications
- 3 real-world project ideas
- Free learning resources

### 3. Resume Analyzer
- ATS compatibility score (0-100)
- Detected skills extraction
- Missing skills identification
- Keyword optimization suggestions
- Improvement recommendations

## 🏗️ Architecture

### Backend (Node.js + Express + TypeScript)
```
backend/
├── src/
│   ├── config/          # OpenAI configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Error handling
│   ├── routes/          # API endpoints
│   ├── services/        # AI service logic
│   ├── types/           # TypeScript interfaces
│   └── server.ts        # Main server file
├── .env.example
├── package.json
└── tsconfig.json
```

### Frontend (React + Vite + TypeScript + Tailwind)
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API client
│   ├── types/           # TypeScript interfaces
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎨 Design System

### Theme
- Dark SaaS startup aesthetic
- Glassmorphism effects
- Neon gradient accents
- Smooth animations
- Professional typography

### Color Palette
- Background: Dark grays (#0a0a0a - #1a1a1a)
- Primary: Cyan/Blue gradients
- Accent: Purple/Pink gradients
- Success: Green
- Warning: Yellow
- Danger: Red

## 🔌 API Endpoints

### POST /api/career
Analyzes user profile and returns career matches
```json
{
  "skills": ["JavaScript", "React"],
  "interests": ["Web Development"],
  "education": "Bachelor's",
  "workType": "Remote",
  "salaryExpectation": "6-10 LPA",
  "location": "India"
}
```

### POST /api/roadmap
Generates learning roadmap for a career
```json
{
  "careerName": "Full Stack Developer"
}
```

### POST /api/resume
Analyzes resume for ATS compatibility
```json
{
  "resumeText": "...",
  "targetCareer": "Data Scientist"
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup

1. **Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npm run dev
```

2. **Frontend:**
```bash
cd frontend
npm install
npm run dev
```

3. Open http://localhost:5173

## 📊 Tech Stack

### Backend
- Node.js & Express
- TypeScript
- OpenAI API (GPT-4)
- Helmet (Security)
- CORS
- Rate Limiting
- Express Validator

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## 🔒 Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation
- Error handling middleware
- Environment variable protection

## 📈 Performance Optimizations

- JSON-only AI responses (no markdown parsing)
- Retry logic for failed API calls
- Request/response validation
- Efficient state management
- Code splitting
- Lazy loading

## 🎯 Hackathon Ready

This project is designed to impress judges with:
- ✅ Production-quality code structure
- ✅ Clean, modular architecture
- ✅ Professional UI/UX
- ✅ Real-world applicability
- ✅ Scalable design
- ✅ Comprehensive documentation
- ✅ Easy deployment

## 📦 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Backend: Render
- Frontend: Vercel
- Environment variables setup
- Production configuration

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

## 📄 License

MIT License - feel free to use this for your hackathon or learning purposes.

## 🙏 Acknowledgments

- OpenAI for GPT API
- Indian job market data insights
- Open source community

---

Built with ❤️ for hackathons and real-world impact
