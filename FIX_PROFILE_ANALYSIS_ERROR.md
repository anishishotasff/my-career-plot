# Fix "Failed to Analyze Profile" Error

## Possible Causes

### 1. Backend Cold Start (Most Likely)
Render free tier sleeps after 15 minutes of inactivity. First request takes 30-60 seconds.

**Solution:**
- Wait 60 seconds and try again
- Keep backend awake by pinging it regularly
- Upgrade to Render paid tier ($7/month)

### 2. CORS Issue
Frontend can't connect to backend due to CORS restrictions.

**Check:**
- Open browser console (F12)
- Look for CORS errors in red

**Solution:** Already fixed in code, but verify in Render logs

### 3. API Endpoint Mismatch
Frontend calling wrong endpoint.

**Verify:**
- Frontend calls: `POST /api/career`
- Backend expects: `POST /api/career`
- ✅ These match

### 4. Missing Environment Variable
Frontend doesn't know backend URL.

**Check Vercel:**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Verify `VITE_API_URL` = `https://my-career-plot.onrender.com/api`

## Quick Diagnostic Tests

### Test 1: Check Backend Health

Open this URL in browser:
```
https://my-career-plot.onrender.com/health
```

**Expected Response:**
```json
{"status":"ok","timestamp":"2024-..."}
```

**If it takes 30-60 seconds:** Backend was sleeping (cold start)
**If it fails:** Backend deployment issue

### Test 2: Test Career API Directly

Open terminal and run:

```bash
curl -X POST https://my-career-plot.onrender.com/api/career \
  -H "Content-Type: application/json" \
  -d '{
    "skills": ["JavaScript", "React"],
    "interests": ["Web Development"],
    "education": "Bachelor",
    "location": "India"
  }'
```

**Expected:** JSON response with 3 career matches

**If error:** Check Render logs for details

### Test 3: Check Frontend API URL

Open browser console on your Vercel app and run:

```javascript
console.log(import.meta.env.VITE_API_URL)
```

**Expected:** `https://my-career-plot.onrender.com/api`

**If undefined:** Environment variable not set in Vercel

## Step-by-Step Fix

### Step 1: Wake Up Backend

1. Open: https://my-career-plot.onrender.com/health
2. Wait for response (may take 60 seconds first time)
3. Once you see `{"status":"ok"}`, backend is awake

### Step 2: Verify Vercel Environment Variable

1. Go to https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Check `VITE_API_URL` exists
5. If missing, add it:
   - Name: `VITE_API_URL`
   - Value: `https://my-career-plot.onrender.com/api`
   - Environments: All (Production, Preview, Development)
6. Redeploy frontend

### Step 3: Check Render Logs

1. Go to https://dashboard.render.com/
2. Click your service
3. Click "Logs" tab
4. Look for errors when you submit profile

Common errors:
- `Cannot find module`: Missing dependency
- `Port already in use`: Restart service
- `Timeout`: Increase timeout in Render settings

### Step 4: Test Again

1. Go to your app: https://my-career-plot.vercel.app
2. Fill out profile form
3. Submit
4. Wait 60 seconds if first request after sleep
5. Should work!

## Temporary Workaround: Keep Backend Awake

Create a simple ping service to prevent sleep:

### Option A: Use Cron-Job.org (Free)

1. Go to https://cron-job.org/
2. Create free account
3. Add new cron job:
   - URL: `https://my-career-plot.onrender.com/health`
   - Schedule: Every 10 minutes
4. Save

### Option B: Use UptimeRobot (Free)

1. Go to https://uptimerobot.com/
2. Create free account
3. Add new monitor:
   - Type: HTTP(s)
   - URL: `https://my-career-plot.onrender.com/health`
   - Interval: 5 minutes
4. Save

This keeps your backend awake 24/7 on free tier!

## If Still Not Working

### Check Browser Console

1. Open your app
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Try submitting profile
5. Look for errors in red

Common errors:
- `Failed to fetch`: Backend not responding (cold start or down)
- `CORS error`: CORS not configured (already fixed in code)
- `404 Not Found`: Wrong API URL
- `500 Internal Server Error`: Backend error (check Render logs)

### Check Network Tab

1. F12 → Network tab
2. Submit profile
3. Look for the POST request to `/api/career`
4. Click on it
5. Check:
   - Status code (should be 200)
   - Response (should have career_matches)
   - Headers (check CORS headers)

## Production-Ready Solution

For a production app without cold starts:

1. **Upgrade Render** ($7/month):
   - No sleep
   - Always-on
   - Better performance

2. **Or use Vercel for backend too**:
   - Deploy backend as serverless functions
   - No cold start issues
   - Free tier is generous

3. **Or use Railway** ($5 credit/month free):
   - Similar to Render
   - Good free tier

## Success Checklist

- [ ] Backend health check responds: https://my-career-plot.onrender.com/health
- [ ] Backend API test works (curl command above)
- [ ] Vercel has VITE_API_URL environment variable
- [ ] Frontend redeployed after adding env var
- [ ] Browser console shows no CORS errors
- [ ] Profile submission works (may take 60s first time)

## Still Having Issues?

Share:
1. Browser console errors (screenshot)
2. Render logs (screenshot)
3. Network tab showing the failed request

I'll help debug further!
