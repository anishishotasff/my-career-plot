# 🔧 Fix Google Login & API Key Issues

## Issue 1: Google Login Not Working

### Problem
Google Sign-In button throws an error when clicked.

### Solution - Enable Google Sign-In in Firebase Console

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `mycareerplot-df6a2`

2. **Enable Google Authentication**
   - Click on "Authentication" in the left sidebar
   - Click on "Sign-in method" tab
   - Find "Google" in the providers list
   - Click on "Google"
   - Toggle "Enable" to ON
   - Add your support email (your email address)
   - Click "Save"

3. **Add Authorized Domains** (if needed)
   - In the same "Sign-in method" tab
   - Scroll down to "Authorized domains"
   - Make sure these are added:
     - `localhost`
     - Your Vercel domain (when deployed)

### Test Google Login
After enabling, try clicking "Continue with Google" button again.

---

## Issue 2: Google API Key Not Working

### Current Status
- Mock AI is ENABLED (USE_MOCK_AI = true)
- This means the app uses fake data instead of real AI
- Your Google API key: `AIzaSyA8NFKPr5cu_DtpImyKOzvgelPmPr_hclk`

### Option A: Keep Using Mock AI (Recommended for Testing)

Mock AI is perfect for testing the UI without needing a real API key.
- All features work with realistic sample data
- No API costs
- No rate limits
- Already configured and working

**To keep using Mock AI:** Do nothing! It's already enabled.

### Option B: Use Real Google AI (Gemini)

If you want to use real AI responses:

1. **Get a NEW API Key**
   - Visit: https://aistudio.google.com/app/apikey
   - Click "Create API Key"
   - Select "Create API key in new project" (or existing project)
   - Copy the new key

2. **Update Backend .env File**
   ```
   GOOGLE_API_KEY=your_new_api_key_here
   ```

3. **Disable Mock AI**
   - Open: `backend/src/config/gemini.ts`
   - Change line 5: `const USE_MOCK_AI = false;`

4. **Restart Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

### Why Your Current API Key Might Not Work
- The API key may not have Generative Language API enabled
- It might be restricted to specific services
- It could be from a different Google Cloud project

---

## Quick Fix Summary

### For Google Login:
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable Google provider
3. Add support email
4. Save

### For API Key:
**Option 1 (Easy):** Keep using Mock AI - already working!
**Option 2 (Real AI):** Get new key from https://aistudio.google.com/app/apikey

---

## Testing After Fixes

1. **Test Google Login:**
   - Go to http://localhost:5173/login
   - Click "Continue with Google"
   - Should open Google account picker
   - Select account and login

2. **Test AI Features:**
   - Go to Career Matching page
   - Fill in profile
   - Click "Find My Path"
   - Should see AI-generated results (mock or real)

---

## Current Configuration

✅ Firebase Config: Properly set up
✅ Mock AI: Enabled and working
✅ Backend: Running on port 5000
✅ Frontend: Running on port 5173

**What needs fixing:**
❌ Google Sign-In provider not enabled in Firebase Console
⚠️ Real Google AI key (optional - Mock AI works fine)
