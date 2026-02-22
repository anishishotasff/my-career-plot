# 🔧 How to Fix Google API Key Issue

## Problem
Your API key doesn't have access to Gemini models (404 error).

---

## ✅ Solution: Enable Generative Language API

### Step 1: Go to Google Cloud Console

Open this link in your browser:
👉 **https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com**

### Step 2: Sign In

- Use the same Google account you used for AI Studio
- Accept any terms if prompted

### Step 3: Enable the API

1. You'll see "Generative Language API" page
2. Click the blue **"ENABLE"** button
3. Wait 10-30 seconds for it to enable

### Step 4: Create New API Key (Recommended)

After enabling the API:

1. Go to: **https://console.cloud.google.com/apis/credentials**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. Copy the new API key (starts with `AIza...`)
5. Click **"RESTRICT KEY"** (recommended)
6. Under "API restrictions":
   - Select **"Restrict key"**
   - Check **"Generative Language API"**
7. Click **"SAVE"**

### Step 5: Update Your Project

Replace the API key in `backend/.env`:

```env
GOOGLE_API_KEY=AIza...your_new_key_here
```

### Step 6: Restart Backend

The backend should auto-restart. If not:
```bash
cd backend
npm run dev
```

### Step 7: Test Again

Open http://localhost:5173 and try the career form!

---

## 🎯 Alternative: Use Mock AI (For Testing)

If you want to test the UI without waiting for API setup, I can create a mock AI that returns sample data instantly.

**Pros:**
- ✅ Works immediately
- ✅ No API key needed
- ✅ Perfect for UI testing
- ✅ Fast responses

**Cons:**
- ❌ Not real AI
- ❌ Same responses every time
- ❌ Only for testing

Would you like me to implement the mock AI while you fix the Google API key?

---

## 📋 Quick Checklist

- [ ] Go to Google Cloud Console
- [ ] Enable "Generative Language API"
- [ ] Create new API key with restrictions
- [ ] Copy the new key
- [ ] Update `backend/.env`
- [ ] Restart backend
- [ ] Test the application

---

## 🚨 Common Issues

### Issue: "API not enabled"
**Solution:** Make sure you clicked ENABLE and waited for it to complete

### Issue: "Billing required"
**Solution:** 
- Gemini API has a free tier
- You may need to enable billing (but won't be charged for free tier usage)
- Go to: https://console.cloud.google.com/billing

### Issue: "Quota exceeded"
**Solution:** You're using the free tier limits. Wait or upgrade.

### Issue: Still getting 404
**Solution:** 
1. Wait 5 minutes after enabling API
2. Create a completely new API key
3. Make sure you're using the right Google account

---

## 💡 Pro Tip

Create the API key with these restrictions for security:
- **Application restrictions:** None (for now)
- **API restrictions:** Only "Generative Language API"

This prevents unauthorized use of your key!

---

## ⏱️ How Long Does This Take?

- **Enabling API:** 30 seconds
- **Creating key:** 1 minute
- **Testing:** 30 seconds

**Total: ~2 minutes**

---

## 🎯 What to Do Now

**Option 1: Fix Google API (Recommended)**
- Follow steps above
- Takes 2 minutes
- Real AI responses

**Option 2: Use Mock AI (Quick Test)**
- I'll implement it now
- Works immediately
- Test UI while fixing API

**Which option do you want?**

Let me know and I'll help you proceed! 🚀
