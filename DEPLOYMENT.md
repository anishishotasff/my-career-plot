# 🚀 Deployment Guide - CareerPilot AI

Complete guide to deploy CareerPilot AI to production.

## 📋 Prerequisites

- OpenAI API key
- GitHub account
- Render account (for backend)
- Vercel account (for frontend)

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Settings:**
- **Name:** `careerpilot-backend`
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Instance Type:** Free (or paid for better performance)

**Environment Variables:**
```
PORT=5000
OPENAI_API_KEY=sk-your-actual-openai-key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. Copy your backend URL: `https://careerpilot-backend.onrender.com`

### Step 3: Test Backend

```bash
curl https://careerpilot-backend.onrender.com/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-..."}
```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Configure Frontend

Create `frontend/.env.production`:
```env
VITE_API_URL=https://careerpilot-backend.onrender.com/api
```

### Step 3: Deploy to Vercel

```bash
cd frontend
vercel login
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** Y
- **Which scope?** Your account
- **Link to existing project?** N
- **Project name?** careerpilot-ai
- **Directory?** ./
- **Override settings?** N

### Step 4: Configure Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://careerpilot-backend.onrender.com/api`
   - **Environment:** Production

5. Redeploy:
```bash
vercel --prod
```

### Step 5: Update Backend CORS

Update backend environment variable on Render:
```
FRONTEND_URL=https://your-actual-frontend-url.vercel.app
```

Redeploy backend service.

## ✅ Verification Checklist

- [ ] Backend health endpoint responds
- [ ] Frontend loads without errors
- [ ] Can submit profile form
- [ ] Career analysis works
- [ ] Roadmap generation works
- [ ] Resume analyzer works
- [ ] No CORS errors in browser console

## 🔍 Troubleshooting

### Backend Issues

**Problem:** 500 Internal Server Error
- Check Render logs: Dashboard → Service → Logs
- Verify `OPENAI_API_KEY` is set correctly
- Check OpenAI API quota/billing

**Problem:** CORS errors
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Include protocol: `https://`
- No trailing slash

### Frontend Issues

**Problem:** API calls fail
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running
- Check browser Network tab for actual error

**Problem:** Build fails
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are in `package.json`

## 📊 Monitoring

### Backend Monitoring (Render)
- View logs in real-time
- Set up email alerts for downtime
- Monitor response times

### Frontend Monitoring (Vercel)
- Analytics dashboard
- Error tracking
- Performance metrics

## 💰 Cost Optimization

### Free Tier Limits

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**OpenAI API:**
- Pay per token
- GPT-4 Turbo: ~$0.01-0.03 per request
- Set usage limits in OpenAI dashboard

### Upgrade Recommendations

For production use:
- **Render:** Upgrade to Starter ($7/month) for always-on
- **Vercel:** Pro ($20/month) for team features
- **OpenAI:** Set monthly budget alerts

## 🔐 Security Best Practices

1. **Never commit `.env` files**
2. **Rotate API keys** regularly
3. **Enable rate limiting** (already configured)
4. **Monitor API usage** in OpenAI dashboard
5. **Set up alerts** for unusual activity
6. **Use HTTPS** everywhere (automatic on Render/Vercel)

## 🚀 Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### Render Custom Domain
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS CNAME record
4. Wait for SSL certificate (automatic)

## 📈 Scaling

### When to Scale

- Response times > 2 seconds
- Frequent 503 errors
- High traffic (>1000 requests/hour)

### Scaling Options

**Backend:**
- Upgrade Render instance type
- Add Redis caching
- Implement request queuing
- Use CDN for static assets

**Frontend:**
- Already scaled by Vercel CDN
- Optimize images
- Code splitting (already done by Vite)
- Lazy loading components

## 🎯 Post-Deployment

1. **Test all features** in production
2. **Share with users** and gather feedback
3. **Monitor errors** and fix issues
4. **Track API costs** in OpenAI dashboard
5. **Set up analytics** (Google Analytics, Mixpanel)
6. **Create backup** of environment variables

## 📞 Support

- **Render:** https://render.com/docs
- **Vercel:** https://vercel.com/docs
- **OpenAI:** https://platform.openai.com/docs

---

🎉 Congratulations! Your CareerPilot AI is now live!
