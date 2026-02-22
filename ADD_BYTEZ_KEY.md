# 🔑 How to Add Your Bytez API Key

## ❌ Current Error

You're seeing this error:
```
Career analysis failed: Bytez API failed: Request failed with status code 401
```

This means your Bytez API key is not configured correctly.

---

## ✅ Solution (3 Steps)

### Step 1: Get Your Bytez API Key

You mentioned you have a Bytez API key. It should look something like:
```
bz_1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 2: Open the .env File

Open this file:
```
backend/.env
```

### Step 3: Replace the Placeholder

Find this line:
```env
BYTEZ_API_KEY=your_bytez_api_key_here
```

Replace it with your actual key:
```env
BYTEZ_API_KEY=bz_your_actual_key_here
```

**Example:**
```env
BYTEZ_API_KEY=bz_abc123def456ghi789jkl012mno345pqr678
```

---

## 🔄 Restart Backend

After adding your key:

1. The backend should auto-restart (if using `npm run dev`)
2. If not, manually restart:
   ```bash
   cd backend
   npm run dev
   ```

---

## 🧪 Test Again

1. Open http://localhost:5173
2. Fill out the profile form
3. Submit
4. You should now get AI-powered results!

---

## 🚨 Common Issues

### Issue 1: Key Still Shows as Invalid

**Check:**
- No extra spaces before/after the key
- No quotes around the key
- Key is on the correct line

**Correct:**
```env
BYTEZ_API_KEY=bz_abc123
```

**Incorrect:**
```env
BYTEZ_API_KEY= bz_abc123     ❌ (space before key)
BYTEZ_API_KEY="bz_abc123"    ❌ (quotes)
BYTEZ_API_KEY = bz_abc123    ❌ (spaces around =)
```

### Issue 2: Backend Didn't Restart

**Solution:**
```bash
# Stop backend (Ctrl+C in terminal)
# Then restart:
cd backend
npm run dev
```

### Issue 3: Wrong API Key Format

**Bytez keys typically start with:**
- `bz_` or
- `sk-` or
- Another prefix specific to Bytez

**Check your Bytez dashboard** for the correct format.

---

## 📝 Your Current .env File

Your `backend/.env` should look like this:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# AI Provider Configuration
AI_PROVIDER=bytez

# Bytez AI Configuration
BYTEZ_API_KEY=bz_your_actual_key_here    ← CHANGE THIS LINE
BYTEZ_MODEL=gpt-4o-mini
```

---

## 🎯 Quick Checklist

Before testing:
- [ ] Bytez API key copied from Bytez dashboard
- [ ] Key pasted into `backend/.env`
- [ ] No extra spaces or quotes
- [ ] Backend restarted
- [ ] Browser refreshed

---

## 💡 Alternative: Use OpenAI Instead

If you want to use OpenAI while you get your Bytez key:

1. Open `backend/.env`
2. Change this line:
   ```env
   AI_PROVIDER=openai
   ```
3. Add your OpenAI key:
   ```env
   OPENAI_API_KEY=sk-your_openai_key_here
   ```
4. Restart backend

---

## 🔍 Verify Your Setup

After adding the key, check the backend terminal for:

**Success:**
```
🚀 CareerPilot AI Backend running on port 5000
📍 Environment: development
```

**If you see errors:**
- Check the error message
- Verify API key is correct
- Check Bytez service status

---

## 📞 Need Help?

### Check These:
1. **Bytez Dashboard** - Verify key is active
2. **Backend Terminal** - Look for specific error messages
3. **Browser Console** - Check for frontend errors
4. **.env File** - Ensure no typos

### Common Error Messages:

**"Invalid Bytez API key"**
→ Key is wrong or expired

**"Bytez API key not configured"**
→ Key is still set to placeholder

**"Request failed with status code 401"**
→ Authentication failed (wrong key)

**"Request failed with status code 429"**
→ Rate limit exceeded (wait a moment)

---

## ✅ Once It Works

You'll see:
- Career matches displayed
- Roadmap generated
- Resume analysis working
- No more 401 errors!

---

**Add your Bytez API key to `backend/.env` and you're good to go! 🚀**
