# 🧪 Test Your Google API - Quick Guide

## ✅ What I Just Fixed

1. **Disabled Mock AI** - Now using real Google AI
2. **Updated API Key** - Using `AIzaSyBz_oohpLwEssvyRnoW-Vrf_Gk5OogDFc0`
3. **Added Model Detection** - Backend will list available models
4. **Better Error Messages** - Clear instructions if something fails
5. **Restarted Backend** - Changes are now active

## 🎯 Current Status

- ✅ Backend running on port 5000
- ✅ Frontend running on port 5173
- ✅ Real AI enabled (Mock AI disabled)
- ⏳ Waiting for API to be enabled

## 🔴 The Problem

Your API key doesn't have access to Gemini models because the **Generative Language API** is not enabled in your Google Cloud project.

## 🟢 The Solution (Do This Now!)

### Option A: Enable API for Current Key (Recommended)

1. **Enable the API**:
   - Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
   - Click **"ENABLE"**
   - Wait 1-2 minutes

2. **Create NEW API Key** (MUST DO!):
   - Visit: https://aistudio.google.com/app/apikey
   - Click **"Create API Key"**
   - Copy the new key

3. **Update backend/.env**:
   ```
   GOOGLE_API_KEY=YOUR_NEW_KEY_HERE
   ```

4. **Restart backend** (I'll do this for you after you update)

### Option B: Use Mock AI (Temporary)

If you want to test the UI without waiting:

1. Open `backend/src/config/gemini.ts`
2. Change line 5: `const USE_MOCK_AI = true;`
3. Backend will use fake data for testing

## 🧪 How to Test

1. Go to: http://localhost:5173
2. Click **"Get Started"**
3. Fill in the profile form:
   - Skills: JavaScript, React, Node.js
   - Interests: Web Development, AI
   - Education: Bachelor's
   - Work Type: Remote
   - Salary: 5-10 LPA
4. Click **"Analyze Career"**

### Expected Results

**If API is working:**
- ✅ Backend logs show: "✅ Success with model: gemini-1.5-flash"
- ✅ You see 3 career matches with percentages
- ✅ No error messages

**If API is NOT enabled:**
- ❌ Error: "Generative Language API not enabled"
- ❌ Link to enable it will be shown
- ❌ Backend logs show: "❌ Failed with gemini-1.5-flash: 404"

## 📊 What You'll See in Backend Logs

When you test, watch the backend terminal for:

```
✅ Using Real Google AI with key: AIzaSyBz_o...
📋 Checking available models...
✅ Available models: ['models/gemini-1.5-flash', 'models/gemini-pro']
🔄 Trying model: gemini-1.5-flash-8b
❌ Failed with gemini-1.5-flash-8b: [404 Not Found]
🔄 Trying model: gemini-1.5-flash
✅ Success with model: gemini-1.5-flash
```

## 🎯 Next Steps

1. **Enable the API** using the link above
2. **Create a NEW API key** (old keys won't work even after enabling)
3. **Update backend/.env** with the new key
4. **Tell me** and I'll restart the backend
5. **Test** the career analysis feature

## 💡 Pro Tip

The Google AI Studio (https://aistudio.google.com) has a free tier that includes:
- ✅ 15 requests per minute
- ✅ 1 million tokens per minute
- ✅ 1,500 requests per day

Perfect for your hackathon project!

## 🆘 Still Having Issues?

If you see the error again after following all steps:

1. Make sure you created a **NEW** API key AFTER enabling the API
2. Check that no IP restrictions are set on the key
3. Try using a different Google account
4. Or use Mock AI temporarily: `USE_MOCK_AI = true`

---

**Ready to test?** Just enable the API and let me know!
