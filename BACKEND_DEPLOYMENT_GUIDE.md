# Backend Deployment Guide

## Current Status
✅ Frontend deployed on Vercel
✅ Firebase authentication working
⚠️ Backend not deployed (showing "Failed to fetch jobs. Showing sample data")

## Quick Deploy Options

### Option 1: Render.com (Recommended - Free Tier)

1. **Create Account**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `anishishotasff/my-career-plot`
   - Select the repository

3. **Configure Service**
   ```
   Name: my-career-plot-backend
   Region: Singapore (closest to India)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Environment" and add:
   ```
   PORT=5000
   NODE_ENV=production
   GOOGLE_API_KEY=your_google_api_key_here
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy your backend URL (e.g., `https://my-career-plot-backend.onrender.com`)

### Option 2: Railway.app (Alternative)

1. **Create Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `anishishotasff/my-career-plot`

3. **Configure**
   - Select "backend" as root directory
   - Add environment variables (same as above)
   - Deploy

### Option 3: Vercel (Backend + Frontend Together)

You can also deploy the backend on Vercel:

1. Create `vercel.json` in root (already exists)
2. Add backend configuration
3. Deploy both together

## After Backend Deployment

### Update Frontend API URL

1. **Check current API configuration**
   ```typescript
   // frontend/src/services/api.ts
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

2. **Add environment variable to Vercel**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
   - Redeploy frontend

3. **Or update the code directly**
   ```typescript
   const API_URL = 'https://your-backend-url.onrender.com/api';
   ```

## Testing Backend

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-backend-url.onrender.com/health

# Get jobs
curl https://your-backend-url.onrender.com/api/jobs

# Career matching
curl -X POST https://your-backend-url.onrender.com/api/careers/match \
  -H "Content-Type: application/json" \
  -d '{"skills":["JavaScript","React"],"interests":["Web Development"]}'
```

## Important Notes

### Free Tier Limitations
- **Render**: Backend sleeps after 15 min of inactivity (first request takes 30-60s to wake up)
- **Railway**: $5 free credit per month
- **Vercel**: Serverless functions have 10s timeout on free tier

### For Production
Consider upgrading to paid tier for:
- No cold starts
- Better performance
- More resources
- Custom domains

## Current Mock AI Setup

Your backend is configured to use Mock AI (`USE_MOCK_AI = true`), which means:
- ✅ No Google API key needed for testing
- ✅ All features work with realistic sample data
- ✅ Perfect for demo/hackathon
- ⚠️ To use real AI, set `USE_MOCK_AI = false` and add valid Google API key

## Troubleshooting

### Backend won't start
- Check logs in Render/Railway dashboard
- Verify all environment variables are set
- Ensure `npm run build` completes successfully

### Frontend can't connect
- Check CORS settings in backend
- Verify API URL is correct
- Check browser console for errors

### Jobs not loading
- Backend might be sleeping (Render free tier)
- Wait 30-60 seconds for first request
- Check backend logs

## Quick Start Commands

```bash
# Test backend locally
cd backend
npm install
npm run dev

# Test frontend locally with deployed backend
cd frontend
# Update .env with backend URL
npm run dev
```

## Recommended: Deploy Backend Now

The fastest way to get everything working:

1. Go to https://render.com/
2. Sign up with GitHub
3. New Web Service → Connect repo
4. Configure as shown above
5. Deploy
6. Update frontend with backend URL
7. Done! 🚀
