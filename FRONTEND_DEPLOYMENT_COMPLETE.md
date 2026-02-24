# Frontend Deployment - Next Steps

## Current Status
✅ Frontend deployed to Vercel
✅ Backend deployed to Vercel  
⚠️ Frontend not connecting to backend (needs environment variable)

## What You Need to Do Now

### Step 1: Find Your Backend URL

First, you need to know your backend Vercel URL. Go to:
1. https://vercel.com/dashboard
2. Find your backend project (might be named `my-career-plot-backend` or similar)
3. Click on it
4. Copy the URL (looks like: `https://my-career-plot-backend.vercel.app`)

### Step 2: Add Environment Variable to Frontend

1. Go to https://vercel.com/dashboard
2. Click on your **FRONTEND** project (the one showing the website)
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Click **Add New**
6. Fill in:
   ```
   Name: VITE_API_URL
   Value: https://YOUR-BACKEND-URL.vercel.app/api
   ```
   (Replace `YOUR-BACKEND-URL` with the actual backend URL from Step 1)
7. Check all three boxes: Production, Preview, Development
8. Click **Save**

### Step 3: Redeploy Frontend

After adding the environment variable, you need to redeploy:

**Option A: From Vercel Dashboard**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots (...) menu
4. Click **Redeploy**
5. Confirm

**Option B: Push a New Commit**
```bash
git add .
git commit -m "connect frontend to backend"
git push origin main
```

Vercel will automatically redeploy.

### Step 4: Wait and Test

1. Wait 2-3 minutes for deployment to complete
2. Visit your frontend URL
3. Try creating a profile and getting career matches
4. Check if data loads properly

## Important: Backend URL Format

Make sure your `VITE_API_URL` ends with `/api`:
- ✅ Correct: `https://my-backend.vercel.app/api`
- ❌ Wrong: `https://my-backend.vercel.app`
- ❌ Wrong: `https://my-backend.vercel.app/api/`

## Troubleshooting

### "Failed to fetch" or Network Error
**Cause**: Environment variable not set or wrong URL
**Fix**: 
1. Check Vercel Settings → Environment Variables
2. Make sure `VITE_API_URL` is set correctly
3. Redeploy after adding/changing variables

### Backend Returns 404
**Cause**: Wrong API endpoint
**Fix**: Make sure URL ends with `/api` (no trailing slash)

### CORS Error
**Cause**: Backend not allowing your frontend domain
**Fix**: Your backend already allows all Vercel domains, so this shouldn't happen

## Quick Test

You can test if your backend is working by visiting:
```
https://YOUR-BACKEND-URL.vercel.app/
```

You should see:
```json
{
  "message": "My Career Plot API",
  "status": "running",
  "endpoints": {
    "health": "/health",
    "api": "/api/*"
  }
}
```

## What Happens After This?

Once you complete these steps:
1. ✅ Frontend will connect to backend
2. ✅ All features will work with real AI (or mock data)
3. ✅ Your app will be fully functional
4. ✅ You can share the URL with anyone

## Your URLs

After deployment, you'll have:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **Backend API**: `https://your-backend.vercel.app/api`

## Need Help?

If you're stuck, tell me:
1. What is your backend Vercel URL?
2. What is your frontend Vercel URL?
3. What error are you seeing?

I'll help you fix it!
