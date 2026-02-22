# 🔥 Firebase Authentication Setup Guide

Firebase Authentication has been integrated into My Career Plot! Follow these steps to configure it.

## ✅ What's Already Done

- ✅ Firebase SDK installed
- ✅ Authentication context created
- ✅ Login page with Firebase auth
- ✅ Signup page with Firebase auth
- ✅ Google & Github OAuth support
- ✅ User state management
- ✅ Protected routes ready
- ✅ Navbar shows user info when logged in

## 🚀 Setup Steps

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: "My Career Plot" (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Register Your Web App

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Enter app nickname: "My Career Plot Web"
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. **Copy the Firebase configuration** - you'll need this!

### Step 3: Enable Authentication Methods

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get Started"
3. Go to **Sign-in method** tab
4. Enable these providers:
   - **Email/Password** - Click, toggle "Enable", Save
   - **Google** - Click, toggle "Enable", Save
   - **Github** - Click, toggle "Enable", add OAuth App credentials, Save

### Step 4: Configure Your App

1. Open `frontend/src/config/firebase.ts`
2. Replace the placeholder config with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyDbFiDmJo78O9hp66p0YXVI3G_pjFkc1Xw"
  authDomain: "mycareerplot-df6a2.firebaseapp.com"
  projectId: "mycareerplot-df6a2"
  storageBucket: "mycareerplot-df6a2.firebasestorage.app"
  messagingSenderId: "227504401171"
  appId: "1:227504401171:web:975fbeb61c8400beadc8e6"
};
```

### Step 5: Set Up OAuth Providers (Optional)

#### For Google OAuth:
- Already configured! Just enable it in Firebase Console

#### For Github OAuth:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: My Career Plot
   - Homepage URL: http://localhost:5173
   - Authorization callback URL: (Copy from Firebase Console)
4. Click "Register application"
5. Copy Client ID and Client Secret
6. Paste them in Firebase Console → Authentication → Github provider

### Step 6: Test Authentication

1. Start your app: `npm run dev` (in frontend folder)
2. Go to http://localhost:5173/signup
3. Try creating an account with:
   - Email/Password
   - Google Sign-in
   - Github Sign-in
4. Check Firebase Console → Authentication → Users to see registered users

## 🎯 Features Available

### Email/Password Authentication
- User registration with email and password
- Login with email and password
- Password validation (min 6 characters)
- Error handling for common issues

### Social Authentication
- Google Sign-in
- Github Sign-in
- One-click authentication
- Automatic profile creation

### User Management
- Display user name/email in navbar
- Logout functionality
- Persistent sessions
- Protected routes (ready to implement)

## 🔒 Security Best Practices

1. **Never commit Firebase config to public repos** (already in .gitignore)
2. **Set up Firebase Security Rules** for production
3. **Enable App Check** for additional security
4. **Use environment variables** for sensitive data

## 📝 Environment Variables (Optional)

For better security, you can use environment variables:

1. Create `frontend/.env`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Update `frontend/src/config/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 🐛 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've replaced the placeholder config in `firebase.ts`

### "Firebase: Error (auth/unauthorized-domain)"
- Add `localhost` to authorized domains in Firebase Console
- Go to Authentication → Settings → Authorized domains

### Google/Github login not working
- Make sure the provider is enabled in Firebase Console
- Check OAuth credentials are correctly configured

### "Module not found: firebase"
- Run `npm install firebase` in the frontend folder

## 🎨 Customization

### Change Auth UI
- Edit `frontend/src/pages/Login.tsx` and `Signup.tsx`
- Modify colors, layout, or add more fields

### Add More Providers
- LinkedIn, Twitter, Facebook, etc.
- Enable in Firebase Console
- Add provider in `firebase.ts`
- Add button in Login/Signup pages

### Protected Routes
- Use `useAuth()` hook to check if user is logged in
- Redirect to login if not authenticated
- Example in any component:
```typescript
const { user } = useAuth();
if (!user) navigate('/login');
```

## 📚 Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

**Need Help?** Check the Firebase Console for detailed error messages and logs.
