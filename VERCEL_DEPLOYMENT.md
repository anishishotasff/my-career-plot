# 🚀 Vercel Deployment Guide for My Career Plot

## 📋 Prerequisites

- GitHub account with your code pushed
- Vercel account (sign up at https://vercel.com)

## 🎯 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Sign in with your GitHub account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your `my-career-plot` repository
   - Click "Import"

3. **Configure Project**
   
   **Framework Preset:** Vite
   
   **Root Directory:** `frontend`
   
   **Build Command:** `npm run build`
   
   **Output Directory:** `dist`
   
   **Install Command:** `npm install`

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `my-career-plot`
   - Directory? `./` (current directory)
   - Override settings? **N**

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## ⚙️ Backend Deployment (Separate)

Your backend needs to be deployed separately. Options:

### Option A: Deploy Backend to Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** my-career-plot-backend
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node

5. Add Environment Variables:
   ```
   GOOGLE_API_KEY=your_google_api_key
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

6. Click "Create Web Service"

### Option B: Deploy Backend to Railway

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Configure:
   - **Root Directory:** `backend`
   - Add environment variables
6. Deploy

## 🔗 Update Frontend API URL

After deploying backend, update your frontend API calls:

1. Create `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

2. Update API calls in `frontend/src/services/api.ts`:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

3. Redeploy frontend:
   ```bash
   vercel --prod
   ```

## 🔥 Firebase Configuration

1. **Update Firebase Authorized Domains**
   - Go to Firebase Console
   - Authentication → Settings → Authorized domains
   - Add your Vercel domain: `your-project.vercel.app`

2. **Update OAuth Redirect URIs**
   - For Google OAuth, add Vercel domain to authorized origins

## ✅ Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render/Railway
- [ ] Environment variables configured
- [ ] Firebase authorized domains updated
- [ ] API URL updated in frontend
- [ ] Test all features:
  - [ ] Login/Signup
  - [ ] Career Analysis
  - [ ] Job Finder
  - [ ] CV Generator
  - [ ] AI Assistant

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Calls Fail
- Check CORS settings in backend
- Verify API URL is correct
- Check environment variables

### Firebase Auth Not Working
- Verify authorized domains in Firebase
- Check Firebase config in frontend
- Ensure environment variables are set

## 📊 Monitoring

- **Vercel Analytics:** Automatically enabled
- **Error Tracking:** Check Vercel logs
- **Performance:** Use Vercel Speed Insights

## 🔄 Continuous Deployment

Once set up, every push to your GitHub repository will automatically deploy to Vercel!

- Push to `main` branch → Production deployment
- Push to other branches → Preview deployments

## 💡 Tips

1. **Custom Domain:** Add your own domain in Vercel settings
2. **Preview Deployments:** Every PR gets a unique preview URL
3. **Rollback:** Easy rollback to previous deployments
4. **Environment Variables:** Different values for preview/production

---

**Your app will be live at:** `https://your-project.vercel.app`

Need help? Check Vercel docs: https://vercel.com/docs
