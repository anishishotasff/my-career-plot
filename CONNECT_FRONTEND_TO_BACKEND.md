# Connect Frontend to Backend

## ✅ Backend Deployed
Your backend is live at: `https://my-career-plot.onrender.com`

## Step 1: Add Environment Variable to Vercel

1. Go to https://vercel.com/dashboard
2. Click on your project: `my-career-plot`
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   ```
   Name: VITE_API_URL
   Value: https://my-career-plot.onrender.com/api
   ```
6. Select all environments: Production, Preview, Development
7. Click **Save**

## Step 2: Redeploy Frontend

After adding the environment variable:

1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

OR simply push a new commit:

```bash
git add .
git commit -m "update: connect frontend to Render backend"
git push origin main
```

Vercel will automatically redeploy.

## Step 3: Test the Connection

Once redeployed, test your app:

1. Visit: https://my-career-plot.vercel.app
2. Try these features:
   - ✅ Create profile and get career matches
   - ✅ Generate roadmap
   - ✅ Analyze resume
   - ✅ Browse jobs
   - ✅ Chat with AI assistant
   - ✅ Generate CV

## Step 4: Test Backend Directly

You can test the backend API directly:

```bash
# Health check
curl https://my-career-plot.onrender.com/health

# Get jobs
curl https://my-career-plot.onrender.com/api/jobs

# Career matching
curl -X POST https://my-career-plot.onrender.com/api/careers/match \
  -H "Content-Type: application/json" \
  -d '{
    "skills": ["JavaScript", "React"],
    "interests": ["Web Development"],
    "education": "Bachelor",
    "location": "India"
  }'
```

## Important Notes

### Cold Start Warning
⚠️ Render free tier sleeps after 15 minutes of inactivity.

**First request after sleep:**
- Takes 30-60 seconds to wake up
- You might see "Failed to fetch" initially
- Just wait and try again

**Solution for demo:**
- Keep a tab open with your app
- Or ping the health endpoint every 10 minutes
- Or upgrade to Render paid tier ($7/month)

### CORS Already Configured
✅ Your backend already allows requests from:
- `https://my-career-plot.vercel.app`
- `https://*.vercel.app` (all Vercel preview deployments)
- `http://localhost:5173` (local development)

## Troubleshooting

### "Failed to fetch" Error
**Cause**: Backend is sleeping (cold start)
**Fix**: Wait 30-60 seconds and try again

### CORS Error
**Cause**: Frontend URL not in CORS whitelist
**Fix**: Already fixed! Your backend allows all Vercel domains

### 404 Not Found
**Cause**: Wrong API endpoint
**Fix**: Check that API_URL ends with `/api`

### Timeout Error
**Cause**: Backend taking too long (AI processing)
**Fix**: Already set to 60 second timeout in api.ts

## Local Development

To test locally with the deployed backend:

```bash
cd frontend
npm run dev
```

The app will use the Render backend automatically.

## Success Checklist

- [ ] Backend deployed on Render: ✅ https://my-career-plot.onrender.com
- [ ] Environment variable added to Vercel
- [ ] Frontend redeployed
- [ ] Test career matching works
- [ ] Test job listings load
- [ ] Test AI assistant responds
- [ ] Test CV generation works
- [ ] Test resume analysis works

## Your App URLs

- **Frontend**: https://my-career-plot.vercel.app
- **Backend**: https://my-career-plot.onrender.com
- **Backend Health**: https://my-career-plot.onrender.com/health
- **Backend API**: https://my-career-plot.onrender.com/api

## Next Steps

1. Add environment variable to Vercel (see Step 1)
2. Redeploy frontend
3. Test all features
4. Share your app! 🚀

Your My Career Plot platform is now fully deployed and ready to use!
