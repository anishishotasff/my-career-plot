# ⚡ Quick Start Guide - CareerPilot AI

Get up and running in 5 minutes!

## 🎯 Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Installation Steps

### 1️⃣ Clone & Install

```bash
# If you have the project folder already
cd careerpilot-ai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2️⃣ Configure Backend

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file and add your OpenAI API key
# Windows: notepad .env
# Mac/Linux: nano .env
```

**backend/.env:**
```env
PORT=5000
OPENAI_API_KEY=sk-your-actual-openai-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3️⃣ Start Backend

```bash
# From backend directory
npm run dev
```

You should see:
```
🚀 CareerPilot AI Backend running on port 5000
📍 Environment: development
```

### 4️⃣ Start Frontend

Open a **new terminal window**:

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.12  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5️⃣ Open Browser

Visit: **http://localhost:5173**

## 🎮 Using the Application

### Step 1: Landing Page
- Click **"Start Your Journey"**

### Step 2: Profile Form
- Add your skills (e.g., JavaScript, Python, React)
- Add interests (e.g., Web Development, AI)
- Select education level
- Choose work type and salary expectation
- Click **"Analyze My Career Path"**

### Step 3: Dashboard
- View your top 3 career matches
- See match percentages, salaries, and demand
- Click **"View Roadmap"** on any career

### Step 4: Roadmap
- See 12-month learning plan
- View certifications and project ideas
- Click **"Save Roadmap"** to store locally

### Step 5: Resume Analyzer
- Navigate to **Resume** from navbar
- Enter target career
- Paste your resume text
- Click **"Analyze Resume"**
- Get ATS score and improvement suggestions

## 🔧 Troubleshooting

### Backend won't start

**Error: "OPENAI_API_KEY is not defined"**
- Make sure `.env` file exists in `backend/` folder
- Check that `OPENAI_API_KEY=sk-...` is set correctly
- No spaces around the `=` sign

**Error: "Port 5000 already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend won't start

**Error: "Cannot find module"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 5173 already in use"**
- Change port in `frontend/vite.config.ts`:
```typescript
server: {
  port: 5174, // Change to any available port
}
```

### API calls fail

**Error: "Network Error" or "Failed to fetch"**
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify `http://localhost:5000/health` returns `{"status":"ok"}`

**Error: "OpenAI API error"**
- Check your OpenAI API key is valid
- Verify you have credits in your OpenAI account
- Check [OpenAI Status](https://status.openai.com/)

### Build errors

**TypeScript errors:**
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

Fix any TypeScript errors shown.

## 📱 Testing Features

### Test Career Analysis
Use this sample profile:
- **Skills:** JavaScript, React, Node.js, MongoDB
- **Interests:** Web Development, Full Stack
- **Education:** Bachelor's Degree
- **Work Type:** Remote
- **Salary:** 10-15 LPA

### Test Resume Analyzer
Use this sample resume:
```
John Doe
Full Stack Developer

Skills: JavaScript, React, Node.js, Express, MongoDB, Git

Experience:
- Built e-commerce website using MERN stack
- Developed REST APIs with Node.js and Express
- Implemented authentication with JWT

Education:
Bachelor of Technology in Computer Science
```

Target Career: Full Stack Developer

## 🎨 Customization

### Change Theme Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color', // Change primary color
  }
}
```

### Modify AI Prompts

Edit `backend/src/services/aiService.ts`:
- `analyzeCareer()` - Career matching prompts
- `generateRoadmap()` - Roadmap generation prompts
- `analyzeResume()` - Resume analysis prompts

### Add New Features

1. Create new route in `backend/src/routes/`
2. Create controller in `backend/src/controllers/`
3. Add service logic in `backend/src/services/`
4. Create frontend page in `frontend/src/pages/`
5. Add route in `frontend/src/App.tsx`

## 📊 Performance Tips

### Reduce API Costs
- Cache responses in localStorage
- Implement request debouncing
- Use GPT-3.5-turbo instead of GPT-4 (cheaper)

### Improve Speed
- Enable response streaming
- Add loading skeletons
- Implement optimistic UI updates

## 🐛 Common Issues

### "AI response is not valid JSON"
- OpenAI sometimes returns markdown
- Already handled with retry logic
- If persists, check OpenAI API status

### "Rate limit exceeded"
- Wait 15 minutes (rate limit window)
- Or upgrade Render instance
- Or implement request queuing

### "CORS error"
- Check `FRONTEND_URL` in backend `.env`
- Must match exactly: `http://localhost:5173`
- No trailing slash

## 📚 Next Steps

1. ✅ Get the app running locally
2. 📖 Read the full [README.md](README.md)
3. 🚀 Deploy to production ([DEPLOYMENT.md](DEPLOYMENT.md))
4. 🎨 Customize the UI and features
5. 📊 Add analytics and monitoring
6. 🤝 Share with the community!

## 💡 Pro Tips

- Use **Ctrl+C** to stop servers
- Keep both terminals open while developing
- Backend auto-reloads on file changes
- Frontend hot-reloads instantly
- Check browser console for errors
- Use React DevTools for debugging

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed docs
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Open an issue on GitHub
- Check OpenAI documentation

---

Happy coding! 🎉
