# Fix Firebase Domain Authorization Error

## Error
```
This domain is not authorized. Please add it in Firebase Console.
```

## Solution

### Step 1: Go to Firebase Console
1. Visit https://console.firebase.google.com/
2. Select your project

### Step 2: Add Authorized Domains
1. In the left sidebar, click **Authentication**
2. Click on the **Settings** tab (gear icon)
3. Scroll down to **Authorized domains**
4. Click **Add domain**

### Step 3: Add Your Domains
Add these domains:

**For Vercel Deployment:**
```
your-app-name.vercel.app
```

**For Local Development:**
```
localhost
```

**If using custom domain:**
```
yourdomain.com
www.yourdomain.com
```

### Step 4: Find Your Vercel Domain
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Copy the domain (e.g., `my-career-plot.vercel.app`)
4. Add it to Firebase authorized domains

### Step 5: Wait and Test
- Changes may take a few minutes to propagate
- Clear browser cache if needed
- Try signing up/logging in again

## Common Authorized Domains

For development and production, you should have:
- `localhost` (for local development)
- `your-app.vercel.app` (Vercel preview/production)
- `your-custom-domain.com` (if using custom domain)

## Screenshot Guide

1. Firebase Console → Authentication → Settings
2. Look for "Authorized domains" section
3. You should see `localhost` already added
4. Click "Add domain" and paste your Vercel URL
5. Click "Add"

## Verification

After adding the domain:
1. Open your deployed app
2. Try Google Sign-in
3. Error should be gone
4. Authentication should work

## Note

- Firebase automatically authorizes `localhost` and `127.0.0.1`
- You need to manually add all production/preview domains
- Each Vercel preview deployment gets a unique URL - you may want to add the main production URL only
