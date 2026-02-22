# 🚀 START HERE - CareerPilot AI

Welcome to CareerPilot AI! This document will guide you through everything you need to know.

---

## 📋 What is CareerPilot AI?

CareerPilot AI is an **AI-powered career guidance platform** specifically designed for the **Indian job market**. It helps users:

1. **Discover career paths** that match their skills and interests
2. **Get personalized roadmaps** for their chosen career
3. **Optimize resumes** for ATS (Applicant Tracking Systems)

Built with **React**, **Node.js**, **TypeScript**, and **OpenAI's GPT models**.

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Step 2: Add OpenAI API Key

1. Get your API key from https://platform.openai.com/api-keys
2. Open `backend/.env`
3. Add: `OPENAI_API_KEY=sk-your-key-here`

### Step 3: Start Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Step 4: Open Browser

Navigate to: http://localhost:5173

**That's it! You're ready to go! 🎉**

---

## 📚 Documentation Guide

We have comprehensive documentation for every aspect of the project:

### 🎯 Getting Started
- **[README.md](README.md)** - Project overview and introduction
- **[QUICKSTART.md](QUICKSTART.md)** - Detailed setup instructions
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Cheat sheet for quick lookup

### 🏗️ Technical Documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and data flow
- **[API.md](API.md)** - API endpoint documentation
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Comprehensive project details

### 🧪 Testing & Debugging
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Test cases and procedures
- **[DEMO_DATA.md](DEMO_DATA.md)** - Sample data for testing
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions

### 🚀 Deployment & Production
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Hosting on Vercel and Render
- **[HACKATHON_CHECKLIST.md](HACKATHON_CHECKLIST.md)** - Pre-submission checklist

---

## 🎯 Key Features

### 1. Career Matching Engine
- Analyzes user profile (skills, interests, education)
- Returns top 3 career matches
- Shows match percentage (0-100%)
- Identifies skill gaps
- Provides salary projections for India
- Rates market demand and automation risk

### 2. Personalized Roadmap
- 12-month structured learning path
- 3 phases (0-3, 3-6, 6-12 months)
- Recommended certifications
- Real-world project ideas
- Free learning resources

### 3. Resume Analyzer
- ATS compatibility score (0-100)
- Detects existing skills
- Identifies missing skills
- Keyword optimization suggestions
- Actionable improvement tips

---

## 🏗️ Project Structure

```
CareerPilot-AI/
│
├── backend/              # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/       # OpenAI configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Error handling
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # AI service logic
│   │   ├── types/        # TypeScript interfaces
│   │   └── server.ts     # Main server file
│   ├── .env.example      # Environment template
│   ├── package.json      # Dependencies
│   └── tsconfig.json     # TypeScript config
│
├── frontend/             # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API client
│   │   ├── types/        # TypeScript interfaces
│   │   ├── App.tsx       # Main app component
│   │   ├── main.tsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── .env.example      # Environment template
│   ├── package.json      # Dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── vite.config.ts    # Vite configuration
│
└── Documentation/        # All .md files
    ├── README.md
    ├── QUICKSTART.md
    ├── API.md
    ├── DEPLOYMENT.md
    ├── TESTING_GUIDE.md
    ├── TROUBLESHOOTING.md
    ├── DEMO_DATA.md
    ├── ARCHITECTURE.md
    ├── PROJECT_OVERVIEW.md
    ├── HACKATHON_CHECKLIST.md
    ├── QUICK_REFERENCE.md
    └── START_HERE.md (you are here!)
```

---

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (fast!)
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **OpenAI API** - AI integration
- **Helmet** - Security
- **CORS** - Cross-origin requests
- **Rate Limiting** - API protection

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/career` | POST | Analyze profile and get career matches |
| `/api/roadmap` | POST | Generate learning roadmap |
| `/api/resume` | POST | Analyze resume for ATS score |
| `/health` | GET | Check server status |

**See [API.md](API.md) for detailed documentation.**

---

## 🎬 Demo Flow

1. **Landing Page** - Hero section with "Get Started" button
2. **Profile Form** - User enters skills, interests, education, etc.
3. **Dashboard** - Shows 3 AI-matched careers with details
4. **Roadmap View** - 12-month learning path for chosen career
5. **Resume Analyzer** - Upload resume and get ATS score

**Total demo time: ~3 minutes**

---

## 🧪 Testing

### Quick Test

1. Start both servers
2. Open http://localhost:5173
3. Fill profile form with sample data:
   - Skills: JavaScript, React, Node.js
   - Interests: Web Development
   - Education: Bachelor's Degree
   - Work Type: Remote
   - Salary: 6-10 LPA
   - Location: India
4. Submit and wait for results
5. Explore dashboard, roadmap, and resume analyzer

**See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive test cases.**

---

## 🐛 Common Issues

| Problem | Quick Fix |
|---------|-----------|
| Port already in use | Kill process or change port |
| Module not found | Run `npm install` |
| OpenAI API error | Check API key in `.env` |
| CORS error | Verify `FRONTEND_URL` in backend `.env` |
| No styles showing | Restart frontend server |

**See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.**

---

## 🚀 Deployment

### Backend (Render)
1. Create account at render.com
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Create account at vercel.com
2. Import GitHub repository
3. Set root directory to `frontend`
4. Deploy

**See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step guide.**

---

## 🏆 Hackathon Ready

This project is designed to impress:

✅ **Production-quality code** - Clean, modular, well-documented
✅ **Real-world problem** - Career guidance for millions
✅ **AI-powered** - Uses cutting-edge GPT models
✅ **Complete features** - 3 major features fully implemented
✅ **Professional UI** - Dark SaaS theme, responsive design
✅ **Easy to demo** - Works out of the box
✅ **Scalable** - Ready for growth

**See [HACKATHON_CHECKLIST.md](HACKATHON_CHECKLIST.md) for submission prep.**

---

## 📊 Sample Data

### Test Profile
```json
{
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Web Development"],
  "education": "Bachelor's Degree",
  "workType": "Remote",
  "salaryExpectation": "6-10 LPA",
  "location": "India"
}
```

### Test Resume
```
Software Developer with 2 years experience in React and Node.js.
Built multiple web applications.
Skills: JavaScript, React, Node.js, MongoDB, Git.
```

**See [DEMO_DATA.md](DEMO_DATA.md) for more examples.**

---

## 🎯 Next Steps

### For Development
1. ✅ Complete setup (you're here!)
2. 📖 Read [QUICKSTART.md](QUICKSTART.md)
3. 🧪 Test with [DEMO_DATA.md](DEMO_DATA.md)
4. 🏗️ Understand [ARCHITECTURE.md](ARCHITECTURE.md)
5. 🔌 Review [API.md](API.md)

### For Hackathon
1. ✅ Complete setup
2. 🧪 Test all features
3. 📝 Prepare demo script
4. 🚀 Deploy to production
5. 📋 Complete [HACKATHON_CHECKLIST.md](HACKATHON_CHECKLIST.md)

### For Production
1. ✅ Complete setup
2. 🧪 Run all tests
3. 🚀 Deploy to Vercel + Render
4. 📊 Monitor usage
5. 🔒 Review security

---

## 💡 Pro Tips

1. **Test early, test often** - Don't wait until demo day
2. **Keep API key safe** - Never commit to Git
3. **Practice demo** - Time yourself, aim for 3 minutes
4. **Have backup plan** - Screenshots, video, localhost
5. **Explain business value** - Not just features
6. **Show enthusiasm** - Judges love passion
7. **Anticipate questions** - Prepare answers
8. **Keep it simple** - Clear > complex

---

## 📞 Need Help?

### Documentation
- Start with [QUICKSTART.md](QUICKSTART.md)
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### Common Resources
- OpenAI API: https://platform.openai.com
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Node.js: https://nodejs.org

### Debugging
1. Check console for errors (F12)
2. Verify both servers are running
3. Check `.env` files are configured
4. Test API with cURL/Postman
5. Review logs in terminal

---

## ✅ Pre-Flight Checklist

Before you start:
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] OpenAI API key obtained
- [ ] Git installed (optional)
- [ ] Code editor ready (VS Code recommended)

Before demo:
- [ ] Both servers running
- [ ] No console errors
- [ ] Sample data ready
- [ ] Demo script practiced
- [ ] Backup plan ready

---

## 🎊 You're All Set!

You now have everything you need to:
- ✅ Run the application locally
- ✅ Understand the architecture
- ✅ Test all features
- ✅ Deploy to production
- ✅ Present at hackathon
- ✅ Win! 🏆

---

## 📖 Recommended Reading Order

1. **START_HERE.md** (you are here!) ← Overview
2. **[QUICKSTART.md](QUICKSTART.md)** ← Setup
3. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ← Cheat sheet
4. **[DEMO_DATA.md](DEMO_DATA.md)** ← Test data
5. **[TESTING_GUIDE.md](TESTING_GUIDE.md)** ← Testing
6. **[ARCHITECTURE.md](ARCHITECTURE.md)** ← Deep dive
7. **[API.md](API.md)** ← API details
8. **[DEPLOYMENT.md](DEPLOYMENT.md)** ← Go live
9. **[HACKATHON_CHECKLIST.md](HACKATHON_CHECKLIST.md)** ← Final prep

---

## 🚀 Ready to Launch?

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev

# Browser
http://localhost:5173
```

**Let's build something amazing! 🌟**

---

**Questions? Check the documentation files above or review the troubleshooting guide.**

Good luck with your hackathon! 🍀
