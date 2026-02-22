# 🚀 Quick Reference Card

## ⚡ Quick Start (2 Minutes)

```bash
# 1. Setup (Windows)
setup.bat

# 2. Add OpenAI API Key
# Edit backend/.env and add: OPENAI_API_KEY=sk-...

# 3. Start Backend
cd backend
npm run dev

# 4. Start Frontend (new terminal)
cd frontend
npm run dev

# 5. Open Browser
http://localhost:5173
```

---

## 📁 Project Structure

```
CareerPilot-AI/
├── backend/          # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/       # OpenAI setup
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # AI logic
│   │   └── server.ts     # Main server
│   └── .env             # API keys (create this!)
│
├── frontend/         # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page views
│   │   ├── services/     # API client
│   │   └── App.tsx       # Main app
│   └── .env             # API URL
│
└── Documentation/    # All .md files
```

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/career` | POST | Analyze profile → Get 3 career matches |
| `/api/roadmap` | POST | Generate 12-month learning roadmap |
| `/api/resume` | POST | Analyze resume → Get ATS score |
| `/health` | GET | Check server status |

---

## 🎯 Key Features

### 1. Career Matching
- Input: Skills, interests, education, work type, salary, location
- Output: 3 careers with match %, skill gaps, salaries, demand

### 2. Roadmap Generation
- Input: Career name
- Output: 12-month plan (3 phases), certifications, projects

### 3. Resume Analysis
- Input: Resume text + target career
- Output: ATS score, detected/missing skills, suggestions

---

## 🎨 Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- OpenAI API (GPT-4)
- Helmet, CORS, Rate Limiting

**Frontend:**
- React 18 + Vite
- TypeScript
- Tailwind CSS
- React Router

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint

# Kill port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Port in use | Kill process or change port |
| Module not found | `npm install` |
| OpenAI error | Check API key in `.env` |
| CORS error | Verify FRONTEND_URL in backend `.env` |
| No styles | Restart frontend server |

---

## 📊 Sample Test Data

**Profile:**
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

**Resume:**
```
Software Developer with 2 years experience.
Skills: JavaScript, React, Node.js, MongoDB, Git.
Built multiple web applications.
```

---

## 🎬 Demo Flow (3 Minutes)

1. **Landing** (10s) → Show hero, click "Get Started"
2. **Profile** (30s) → Fill form, submit
3. **Dashboard** (45s) → Show 3 careers, explain features
4. **Roadmap** (30s) → Click roadmap, show phases
5. **Resume** (30s) → Analyze resume, show score
6. **Wrap** (15s) → Recap, thank judges

---

## 🔒 Environment Variables

**backend/.env:**
```
OPENAI_API_KEY=sk-proj-xxxxx
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**frontend/.env:**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📱 Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Landing | Hero + CTA |
| `/profile` | ProfileForm | User input |
| `/dashboard` | Dashboard | Career matches |
| `/roadmap/:career` | RoadmapView | Learning path |
| `/resume` | ResumeAnalyzer | ATS analysis |

---

## 🎨 Color Scheme

- Background: `#0a0a0a` - `#1a1a1a`
- Primary: Cyan/Blue gradients
- Accent: Purple/Pink gradients
- Success: Green (`#10b981`)
- Warning: Yellow (`#f59e0b`)
- Danger: Red (`#ef4444`)

---

## 🚀 Deployment URLs

**Backend (Render):**
- Build: `cd backend && npm install && npm run build`
- Start: `cd backend && npm start`

**Frontend (Vercel):**
- Root: `frontend`
- Build: `npm run build`
- Output: `dist`

---

## 📞 Troubleshooting

1. **Server won't start** → Check port, reinstall deps
2. **API fails** → Verify OpenAI key, check internet
3. **No data** → Check console, verify API URL
4. **Styles broken** → Restart dev server
5. **Build fails** → Check TypeScript errors

---

## ✅ Pre-Demo Checklist

- [ ] Both servers running
- [ ] OpenAI API key valid
- [ ] Sample data ready
- [ ] Browser cache cleared
- [ ] No console errors
- [ ] Mobile view tested
- [ ] Backup plan ready

---

## 🏆 Winning Points

1. **Real problem** - Career guidance for India
2. **AI-powered** - Uses GPT-4
3. **Complete** - 3 major features
4. **Professional** - Production-quality
5. **Documented** - Easy to understand
6. **Scalable** - Clean architecture

---

## 📚 Documentation Files

- `README.md` - Project overview
- `QUICKSTART.md` - Setup guide
- `API.md` - Endpoint docs
- `DEPLOYMENT.md` - Hosting guide
- `TESTING_GUIDE.md` - Test cases
- `TROUBLESHOOTING.md` - Common issues
- `DEMO_DATA.md` - Sample data
- `HACKATHON_CHECKLIST.md` - Submission prep

---

## 💡 Pro Tips

1. Test everything before demo
2. Have backup screenshots
3. Practice demo timing
4. Explain business value
5. Show enthusiasm
6. Anticipate questions
7. Highlight unique features
8. Keep it simple

---

## 🎯 Elevator Pitch

"CareerPilot AI uses OpenAI to analyze your profile and recommend the top 3 careers for the Indian job market, complete with match scores, salary projections, and skill gaps. It generates a personalized 12-month roadmap and analyzes your resume for ATS compatibility. Built with React and Node.js, it's production-ready and solves a real problem for millions of job seekers."

---

## 📊 Key Metrics

- **Response Time:** <15s for AI calls
- **Match Accuracy:** AI-powered analysis
- **Roadmap Detail:** 3 phases, 12 months
- **ATS Score:** 0-100 scale
- **Market Focus:** India-specific
- **Tech Stack:** Modern, scalable

---

## 🔗 Useful Links

- OpenAI API: https://platform.openai.com
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev
- Express: https://expressjs.com

---

**Print this page and keep it handy during the hackathon! 📄**

Good luck! 🍀
