# Troubleshooting Guide

## 🔧 Common Issues and Solutions

### 1. Backend Won't Start

#### Issue: "Port 5000 already in use"
**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution (Windows):**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution (Linux/Mac):**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

**Alternative:** Change port in `backend/.env`:
```
PORT=5001
```

---

#### Issue: "Cannot find module"
**Error Message:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

#### Issue: "OpenAI API Error"
**Error Message:**
```
Error: Invalid API key
```

**Solution:**
1. Check `backend/.env` file exists
2. Verify OPENAI_API_KEY is set correctly
3. Ensure no extra spaces or quotes
4. Test API key at https://platform.openai.com/api-keys

**Correct format:**
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

---

### 2. Frontend Won't Start

#### Issue: "Port 5173 already in use"
**Solution:**
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

**Alternative:** Change port in `frontend/vite.config.ts`:
```typescript
server: {
  port: 5174,
  // ...
}
```

---

#### Issue: "Module not found"
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### 3. API Connection Issues

#### Issue: "Network Error" or "Failed to fetch"
**Symptoms:**
- Frontend shows "Unable to connect to server"
- Console shows CORS errors

**Solution:**
1. Verify backend is running on port 5000
2. Check `backend/.env` has correct FRONTEND_URL:
   ```
   FRONTEND_URL=http://localhost:5173
   ```
3. Check `frontend/.env` has correct API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Restart both servers

---

#### Issue: "CORS Error"
**Error Message:**
```
Access to fetch at 'http://localhost:5000/api/career' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
1. Verify FRONTEND_URL in `backend/.env`
2. Check CORS configuration in `backend/src/server.ts`
3. Restart backend server

---

### 4. OpenAI API Issues

#### Issue: "Rate limit exceeded"
**Error Message:**
```
Error: Rate limit exceeded
```

**Solution:**
1. Wait a few minutes before retrying
2. Check your OpenAI usage at https://platform.openai.com/usage
3. Upgrade your OpenAI plan if needed
4. Implement request queuing in production

---

#### Issue: "Insufficient quota"
**Error Message:**
```
Error: You exceeded your current quota
```

**Solution:**
1. Add credits to your OpenAI account
2. Check billing at https://platform.openai.com/account/billing
3. Verify payment method is valid

---

#### Issue: "Invalid JSON response"
**Symptoms:**
- API returns markdown instead of JSON
- Parsing errors in console

**Solution:**
This should be handled by the code, but if it persists:
1. Check OpenAI model version in `backend/src/config/openai.ts`
2. Verify `response_format: { type: 'json_object' }` is set
3. Update OpenAI library: `npm update openai`

---

### 5. Build Issues

#### Issue: TypeScript errors
**Error Message:**
```
TS2307: Cannot find module 'X' or its corresponding type declarations
```

**Solution:**
```bash
# Backend
cd backend
npm install --save-dev @types/node @types/express @types/cors

# Frontend
cd frontend
npm install --save-dev @types/react @types/react-dom
```

---

#### Issue: Tailwind styles not working
**Symptoms:**
- No styling applied
- Classes not working

**Solution:**
1. Verify `tailwind.config.js` exists
2. Check `postcss.config.js` exists
3. Ensure `index.css` imports Tailwind:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Restart dev server

---

### 6. Runtime Errors

#### Issue: "localStorage is not defined"
**Solution:**
This shouldn't happen in browser, but if testing in Node:
```typescript
// Add check before using localStorage
if (typeof window !== 'undefined' && window.localStorage) {
  localStorage.setItem('key', 'value');
}
```

---

#### Issue: React Router not working
**Symptoms:**
- 404 on page refresh
- Routes not loading

**Solution:**
1. Verify `BrowserRouter` wraps App in `main.tsx`
2. Check route paths in `App.tsx`
3. For production, configure server redirects

---

### 7. Performance Issues

#### Issue: Slow API responses
**Symptoms:**
- Takes >30 seconds to get results
- Timeout errors

**Solution:**
1. Check internet connection
2. Verify OpenAI API status: https://status.openai.com
3. Reduce prompt complexity
4. Consider using GPT-3.5 instead of GPT-4 for faster responses

---

#### Issue: High memory usage
**Solution:**
1. Clear browser cache
2. Close unused tabs
3. Restart dev servers
4. Check for memory leaks in React DevTools

---

### 8. Deployment Issues

#### Issue: Environment variables not working in production
**Solution:**
1. Verify variables are set in hosting platform
2. For Vercel: Add in Project Settings → Environment Variables
3. For Render: Add in Environment section
4. Redeploy after adding variables

---

#### Issue: Build fails on Vercel/Render
**Solution:**
1. Check build logs for specific errors
2. Verify Node version matches local:
   ```json
   "engines": {
     "node": "18.x"
   }
   ```
3. Ensure all dependencies are in `package.json`
4. Check for TypeScript errors

---

### 9. Data Issues

#### Issue: Career matches seem incorrect
**Solution:**
This is AI-generated, but you can:
1. Improve prompt engineering in `aiService.ts`
2. Add more context to user profile
3. Use GPT-4 for better results
4. Fine-tune temperature parameter

---

#### Issue: Roadmap is too generic
**Solution:**
1. Make prompts more specific
2. Add industry-specific context
3. Include user's current skill level in prompt
4. Request more detailed breakdowns

---

### 10. Security Issues

#### Issue: API key exposed in frontend
**Solution:**
1. NEVER put API keys in frontend code
2. Always use backend proxy
3. Check `.env` is in `.gitignore`
4. Rotate API key if exposed

---

#### Issue: Rate limiting not working
**Solution:**
1. Verify rate limiter middleware in `server.ts`
2. Test with multiple requests
3. Adjust limits if needed:
   ```typescript
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 50 // Reduce if needed
   });
   ```

---

## 🔍 Debugging Tips

### Enable Verbose Logging

**Backend:**
```typescript
// Add to server.ts
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

**Frontend:**
```typescript
// Add to api.ts
console.log('API Request:', endpoint, data);
console.log('API Response:', response.data);
```

---

### Check API Health

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### Test OpenAI Connection

Create `backend/test-openai.js`:
```javascript
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello!' }]
    });
    console.log('✅ OpenAI connection successful');
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('❌ OpenAI connection failed:', error.message);
  }
}

test();
```

Run: `node backend/test-openai.js`

---

## 📞 Getting Help

### Check Logs
- **Backend:** Terminal where `npm run dev` is running
- **Frontend:** Browser console (F12)
- **Network:** Browser DevTools → Network tab

### Useful Commands
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules package-lock.json
npm install
```

### Still Stuck?

1. Check GitHub Issues (if applicable)
2. Review documentation files
3. Search error message on Stack Overflow
4. Check OpenAI API status
5. Verify all prerequisites are installed

---

## ✅ Health Check Checklist

Before reporting an issue, verify:

- [ ] Node.js 18+ installed
- [ ] npm installed and updated
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` files created and configured
- [ ] OpenAI API key is valid
- [ ] Ports 5000 and 5173 are available
- [ ] Backend server is running
- [ ] Frontend server is running
- [ ] No console errors
- [ ] Internet connection is stable

---

## 🆘 Emergency Reset

If nothing works, try a complete reset:

```bash
# Stop all servers (Ctrl+C)

# Backend reset
cd backend
rm -rf node_modules package-lock.json
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npm run dev

# Frontend reset (in new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

Most issues can be resolved by restarting servers or reinstalling dependencies. Good luck! 🚀
