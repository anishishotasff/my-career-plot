import { Request, Response } from 'express';

// LinkedIn OAuth Configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '';
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:5000/api/auth/linkedin/callback';

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback';

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:5000/api/auth/github/callback';

// LinkedIn OAuth - Initiate
export const linkedinAuth = (req: Request, res: Response) => {
  const scope = 'openid profile email';
  const state = Math.random().toString(36).substring(7);
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${LINKEDIN_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&` +
    `state=${state}&` +
    `scope=${encodeURIComponent(scope)}`;
  
  res.redirect(authUrl);
};

// LinkedIn OAuth - Callback
export const linkedinCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    const profile = await profileResponse.json();

    // Here you would typically:
    // 1. Check if user exists in database
    // 2. Create new user if doesn't exist
    // 3. Generate JWT token
    // 4. Store session

    // For demo purposes, redirect with user data
    const userData = {
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
      provider: 'linkedin',
    };

    // Redirect to frontend with success
    res.redirect(`${process.env.FRONTEND_URL}/profile?auth=success&user=${encodeURIComponent(JSON.stringify(userData))}`);
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// Google OAuth - Initiate
export const googleAuth = (req: Request, res: Response) => {
  const scope = 'openid profile email';
  const state = Math.random().toString(36).substring(7);
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `response_type=code&` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&` +
    `state=${state}&` +
    `scope=${encodeURIComponent(scope)}`;
  
  res.redirect(authUrl);
};

// Google OAuth - Callback
export const googleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: GOOGLE_REDIRECT_URI,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    const profile = await profileResponse.json();

    const userData = {
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
      provider: 'google',
    };

    res.redirect(`${process.env.FRONTEND_URL}/profile?auth=success&user=${encodeURIComponent(JSON.stringify(userData))}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// GitHub OAuth - Initiate
export const githubAuth = (req: Request, res: Response) => {
  const scope = 'read:user user:email';
  const state = Math.random().toString(36).substring(7);
  
  const authUrl = `https://github.com/login/oauth/authorize?` +
    `client_id=${GITHUB_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&` +
    `state=${state}&` +
    `scope=${encodeURIComponent(scope)}`;
  
  res.redirect(authUrl);
};

// GitHub OAuth - Callback
export const githubCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code as string,
        redirect_uri: GITHUB_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/json',
      },
    });

    const profile = await profileResponse.json();

    // Get user email (GitHub requires separate call)
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/json',
      },
    });

    const emails = await emailResponse.json();
    const primaryEmail = emails.find((email: any) => email.primary)?.email || emails[0]?.email;

    const userData = {
      name: profile.name || profile.login,
      email: primaryEmail,
      picture: profile.avatar_url,
      provider: 'github',
    };

    res.redirect(`${process.env.FRONTEND_URL}/profile?auth=success&user=${encodeURIComponent(JSON.stringify(userData))}`);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};
