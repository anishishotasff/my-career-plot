# 🏗️ System Architecture

## Overview

CareerPilot AI is a full-stack web application with a React frontend, Node.js backend, and OpenAI API integration.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     (http://localhost:5173)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages: Landing, Profile, Dashboard, Roadmap, Resume │  │
│  │  Components: Navbar, CareerCard, LoadingSpinner      │  │
│  │  Services: API Client (Axios)                        │  │
│  │  Styling: Tailwind CSS                               │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API
                         │ /api/career
                         │ /api/roadmap
                         │ /api/resume
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   BACKEND (Node.js/Express)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware: CORS, Helmet, Rate Limiter, Error       │  │
│  │  Routes: careerRoutes, roadmapRoutes, resumeRoutes   │  │
│  │  Controllers: Handle requests, validate input        │  │
│  │  Services: AI Service (OpenAI integration)           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ OpenAI API
                         │ GPT-4 / GPT-3.5
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      OPENAI API                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Model: gpt-4 or gpt-3.5-turbo                       │  │
│  │  Response Format: JSON                               │  │
│  │  Temperature: 0.7                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

```
frontend/
│
├── src/
│   │
│   ├── main.tsx                    # Entry point
│   │   └── Renders App component
│   │
│   ├── App.tsx                     # Main app with routing
│   │   ├── BrowserRouter
│   │   ├── Navbar (persistent)
│   │   └── Routes:
│   │       ├── / → Landing
│   │       ├── /profile → ProfileForm
│   │       ├── /dashboard → Dashboard
│   │       ├── /roadmap/:career → RoadmapView
│   │       └── /resume → ResumeAnalyzer
│   │
│   ├── pages/
│   │   ├── Landing.tsx             # Hero section + CTA
│   │   ├── ProfileForm.tsx         # User input form
│   │   ├── Dashboard.tsx           # Career matches display
│   │   ├── RoadmapView.tsx         # Learning roadmap
│   │   └── ResumeAnalyzer.tsx      # Resume analysis
│   │
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── CareerCard.tsx          # Career match card
│   │   └── LoadingSpinner.tsx      # Loading indicator
│   │
│   ├── services/
│   │   └── api.ts                  # API client (Axios)
│   │       ├── analyzeCareer()
│   │       ├── generateRoadmap()
│   │       └── analyzeResume()
│   │
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   │
│   └── index.css                   # Global styles + Tailwind
│
└── Configuration:
    ├── vite.config.ts              # Vite + proxy setup
    ├── tailwind.config.js          # Tailwind theme
    ├── tsconfig.json               # TypeScript config
    └── .env                        # Environment variables
```

---

## Backend Architecture

```
backend/
│
├── src/
│   │
│   ├── server.ts                   # Main server file
│   │   ├── Express app setup
│   │   ├── Middleware configuration
│   │   ├── Route mounting
│   │   └── Error handling
│   │
│   ├── config/
│   │   └── openai.ts               # OpenAI client setup
│   │       └── API key configuration
│   │
│   ├── routes/
│   │   ├── careerRoutes.ts         # POST /api/career
│   │   ├── roadmapRoutes.ts        # POST /api/roadmap
│   │   └── resumeRoutes.ts         # POST /api/resume
│   │
│   ├── controllers/
│   │   ├── careerController.ts     # Handle career requests
│   │   ├── roadmapController.ts    # Handle roadmap requests
│   │   └── resumeController.ts     # Handle resume requests
│   │
│   ├── services/
│   │   └── aiService.ts            # OpenAI integration
│   │       ├── analyzeCareer()     # Career matching logic
│   │       ├── generateRoadmap()   # Roadmap generation
│   │       ├── analyzeResume()     # Resume analysis
│   │       └── parseJSONResponse() # JSON parsing utility
│   │
│   ├── middleware/
│   │   └── errorHandler.ts         # Global error handler
│   │
│   └── types/
│       └── index.ts                # TypeScript interfaces
│
└── Configuration:
    ├── tsconfig.json               # TypeScript config
    ├── package.json                # Dependencies
    └── .env                        # Environment variables
```

---

## Data Flow

### 1. Career Analysis Flow

```
User fills profile form
        ↓
ProfileForm.tsx validates input
        ↓
api.analyzeCareer(profile) called
        ↓
POST /api/career
        ↓
careerController.analyzeCareer()
        ↓
aiService.analyzeCareer(profile)
        ↓
OpenAI API call with structured prompt
        ↓
JSON response parsed
        ↓
3 career matches returned
        ↓
Dashboard.tsx displays results
        ↓
User sees career cards with:
  - Match percentage
  - Skill gaps
  - Salary info
  - Market demand
  - Automation risk
```

### 2. Roadmap Generation Flow

```
User clicks "View Roadmap" on career card
        ↓
Navigate to /roadmap/:careerName
        ↓
RoadmapView.tsx loads
        ↓
api.generateRoadmap(careerName) called
        ↓
POST /api/roadmap
        ↓
roadmapController.generateRoadmap()
        ↓
aiService.generateRoadmap(careerName)
        ↓
OpenAI API call with roadmap prompt
        ↓
JSON response parsed
        ↓
12-month roadmap returned
        ↓
RoadmapView.tsx displays:
  - 3 phases (0-3, 3-6, 6-12 months)
  - Skills per phase
  - Resources
  - Certifications
  - Project ideas
```

### 3. Resume Analysis Flow

```
User navigates to /resume
        ↓
ResumeAnalyzer.tsx loads
        ↓
User enters resume text + target career
        ↓
api.analyzeResume(resumeText, targetCareer) called
        ↓
POST /api/resume
        ↓
resumeController.analyzeResume()
        ↓
aiService.analyzeResume(resumeText, targetCareer)
        ↓
OpenAI API call with resume analysis prompt
        ↓
JSON response parsed
        ↓
Analysis returned
        ↓
ResumeAnalyzer.tsx displays:
  - ATS score (0-100)
  - Detected skills
  - Missing skills
  - Keyword suggestions
  - Improvement points
```

---

## API Request/Response Flow

### Career Analysis

**Request:**
```http
POST /api/career
Content-Type: application/json

{
  "skills": ["JavaScript", "React"],
  "interests": ["Web Development"],
  "education": "Bachelor's Degree",
  "workType": "Remote",
  "salaryExpectation": "6-10 LPA",
  "location": "India"
}
```

**Response:**
```json
{
  "career_matches": [
    {
      "career_name": "Full Stack Developer",
      "match_percentage": 85,
      "why_match": "Your skills align perfectly...",
      "required_skills": ["JavaScript", "React", "Node.js", "SQL"],
      "skill_gap": ["Node.js", "SQL"],
      "entry_salary_india": "6-8 LPA",
      "five_year_projection": "15-25 LPA",
      "market_demand": "High",
      "automation_risk": "Low"
    }
  ]
}
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Rate Limiting                                            │
│     └─ 100 requests per 15 minutes per IP                   │
│                                                               │
│  2. CORS                                                     │
│     └─ Only allow requests from frontend URL                │
│                                                               │
│  3. Helmet.js                                                │
│     └─ Security headers (XSS, clickjacking, etc.)           │
│                                                               │
│  4. Input Validation                                         │
│     └─ Validate all request bodies                          │
│                                                               │
│  5. Environment Variables                                    │
│     └─ API keys never in code                               │
│                                                               │
│  6. Error Handling                                           │
│     └─ Never expose internal errors to client               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## State Management

### Frontend State

```
Landing Page
  └─ No state (static)

ProfileForm
  ├─ formData (local state)
  ├─ loading (local state)
  └─ error (local state)

Dashboard
  ├─ careerMatches (from location.state)
  └─ Passed from ProfileForm via navigation

RoadmapView
  ├─ roadmap (local state)
  ├─ loading (local state)
  ├─ error (local state)
  └─ careerName (from URL params)

ResumeAnalyzer
  ├─ resumeText (local state)
  ├─ targetCareer (local state)
  ├─ analysis (local state)
  ├─ loading (local state)
  └─ error (local state)
```

**Note:** No global state management (Redux/Context) needed for this scope.

---

## Technology Stack Details

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| React Router | 6.x | Routing |
| Axios | 1.x | HTTP client |

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime |
| Express | 4.x | Web framework |
| TypeScript | 5.x | Type safety |
| OpenAI | 4.x | AI integration |
| Helmet | 7.x | Security |
| CORS | 2.x | Cross-origin |
| express-rate-limit | 7.x | Rate limiting |

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         PRODUCTION                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (Vercel)                                           │
│  ├─ Domain: careerpilot-ai.vercel.app                       │
│  ├─ CDN: Global edge network                                │
│  ├─ SSL: Automatic HTTPS                                    │
│  └─ Build: npm run build → dist/                            │
│                                                               │
│  Backend (Render)                                            │
│  ├─ Domain: careerpilot-api.onrender.com                    │
│  ├─ SSL: Automatic HTTPS                                    │
│  ├─ Build: npm run build → dist/                            │
│  └─ Start: npm start                                        │
│                                                               │
│  Environment Variables                                       │
│  ├─ Frontend: VITE_API_URL (Vercel)                         │
│  └─ Backend: OPENAI_API_KEY, FRONTEND_URL (Render)          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Performance Considerations

### Frontend Optimizations
- Code splitting with React.lazy (ready for implementation)
- Tailwind CSS purging (automatic in production)
- Vite's fast HMR in development
- Minimal bundle size

### Backend Optimizations
- JSON-only responses (no markdown parsing)
- Retry logic for failed API calls
- Request validation before AI calls
- Efficient error handling

### API Optimizations
- Structured prompts for consistent responses
- Temperature set to 0.7 for balance
- JSON mode enforced in OpenAI calls
- Response parsing with fallback

---

## Error Handling Strategy

```
Error occurs
    ↓
Caught by try-catch
    ↓
Logged to console (server-side)
    ↓
Formatted error response
    ↓
Sent to client with appropriate status code
    ↓
Displayed to user with friendly message
    ↓
User can retry or navigate away
```

**Error Types:**
- Validation errors (400)
- Authentication errors (401)
- Rate limit errors (429)
- Server errors (500)
- OpenAI API errors (502)

---

## Scalability Considerations

### Current Architecture
- Stateless backend (easy to scale horizontally)
- No database (reduces complexity)
- API-based (can add caching layer)
- Modular code (easy to extend)

### Future Enhancements
- Add Redis for caching
- Implement database for user profiles
- Add authentication (JWT)
- Implement job queue for long-running tasks
- Add monitoring and logging (Sentry, LogRocket)
- Implement A/B testing
- Add analytics

---

## Development Workflow

```
1. Local Development
   ├─ Backend: npm run dev (port 5000)
   ├─ Frontend: npm run dev (port 5173)
   └─ Hot reload enabled

2. Testing
   ├─ Manual testing with sample data
   ├─ API testing with cURL/Postman
   └─ Browser testing (Chrome DevTools)

3. Build
   ├─ Backend: npm run build → dist/
   └─ Frontend: npm run build → dist/

4. Deployment
   ├─ Push to GitHub
   ├─ Vercel auto-deploys frontend
   └─ Render auto-deploys backend

5. Monitoring
   ├─ Check logs in Vercel/Render dashboards
   └─ Monitor OpenAI usage
```

---

## API Integration Details

### OpenAI Configuration

```typescript
// backend/src/config/openai.ts
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const OPENAI_MODEL = 'gpt-4'; // or 'gpt-3.5-turbo'
```

### Prompt Engineering

**System Prompt:**
- Sets AI role and behavior
- Enforces JSON-only responses
- Specifies domain expertise

**User Prompt:**
- Provides user data
- Specifies output format
- Includes examples

**Response Format:**
- `response_format: { type: 'json_object' }`
- Ensures structured output
- Reduces parsing errors

---

This architecture is designed to be:
- ✅ Scalable
- ✅ Maintainable
- ✅ Secure
- ✅ Performant
- ✅ Easy to understand
- ✅ Production-ready

---

**For more details, see individual documentation files.**
