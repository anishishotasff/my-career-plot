# Fix Render.com Deployment

## Current Setup (From Screenshot)
✅ Service created: `my-career-plot`
✅ Connected to GitHub: `anishishotasff/my-career-plot`
✅ Environment variables added:
   - GOOGLE_API_KEY
   - NODE_ENV
   - PORT

## Step-by-Step Fix

### 1. Verify Service Settings

Click on **Settings** tab and verify:

```
Name: my-career-plot
Region: Singapore (or closest to you)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### 2. Check Environment Variables

In the **Environment** tab, ensure you have:

```
PORT=5000
NODE_ENV=production
GOOGLE_API_KEY=your_key_here
```

**Note**: The PORT variable might not be needed as Render provides it automatically.

### 3. Fix Backend for Production

The backend needs a few adjustments for Render. Let me check if these are in place:

#### A. Update server.ts to use Render's PORT

```typescript
const PORT = process.env.PORT || 5000;
```

#### B. Add CORS for your frontend domain

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://my-career-plot.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));
```

### 4. Check Build Command

Render needs to:
1. Install dependencies: `npm install`
2. Build TypeScript: `npm run build`
3. Start server: `npm start`

Verify your `backend/package.json` has:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts"
  }
}
```

### 5. Common Render Errors & Fixes

#### Error: "Cannot find module"
**Fix**: Make sure `dist` folder is created during build
- Check build logs
- Verify `tsc` runs successfully
- Check `tsconfig.json` has correct `outDir`

#### Error: "Port already in use"
**Fix**: Use Render's PORT environment variable
```typescript
const PORT = process.env.PORT || 5000;
```

#### Error: "Module not found: @types/..."
**Fix**: Install missing types
```bash
npm install --save-dev @types/express @types/cors @types/node
```

#### Error: Build timeout
**Fix**: Increase build timeout in Render settings or optimize build

### 6. Deploy Backend

1. Click **Manual Deploy** → **Deploy latest commit**
2. Watch the logs for errors
3. Wait for "Your service is live 🎉"
4. Copy your backend URL: `https://my-career-plot.onrender.com`

### 7. Test Backend

Once deployed, test these endpoints:

```bash
# Health check
curl https://my-career-plot.onrender.com/health

# Get jobs
curl https://my-career-plot.onrender.com/api/jobs

# Test AI
curl -X POST https://my-career-plot.onrender.com/api/careers/match \
  -H "Content-Type: application/json" \
  -d '{"skills":["JavaScript"],"interests":["Web Development"],"education":"Bachelor","location":"India"}'
```

### 8. Update Frontend to Use Backend

Once backend is working, update frontend:

#### Option A: Environment Variable (Recommended)

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add: `VITE_API_URL` = `https://my-career-plot.onrender.com/api`
4. Redeploy frontend

#### Option B: Update Code Directly

```typescript
// frontend/src/services/api.ts
const API_URL = 'https://my-career-plot.onrender.com/api';
```

### 9. Troubleshooting Render Logs

Click **Logs** tab to see:
- Build logs (during deployment)
- Runtime logs (after deployment)

Common log messages:

**Good:**
```
==> Your service is live 🎉
==> Server running on port 5000
```

**Bad:**
```
==> Build failed
==> Error: Cannot find module
==> Port 5000 is already in use
```

### 10. Free Tier Limitations

⚠️ **Important**: Render free tier:
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- 750 hours/month free

**For Demo**: This is fine! Just warn users the first load might be slow.

**For Production**: Upgrade to paid tier ($7/month) for:
- No cold starts
- Always-on service
- Better performance

## Quick Checklist

- [ ] Root Directory set to `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Environment variables added
- [ ] Backend deploys successfully
- [ ] Backend URL accessible
- [ ] Frontend updated with backend URL
- [ ] Test all API endpoints

## If Still Failing

1. **Check Logs**: Click "Logs" tab in Render
2. **Copy Error**: Share the exact error message
3. **Check package.json**: Ensure all dependencies are listed
4. **Try Local Build**: Run `npm run build` locally to test
5. **Check Node Version**: Render uses Node 14+ by default

## Alternative: Deploy Both on Vercel

If Render continues to fail, you can deploy backend on Vercel too:

1. Keep frontend on Vercel
2. Create new Vercel project for backend
3. Set Root Directory to `backend`
4. Add environment variables
5. Deploy

Vercel serverless functions work great for this use case!
