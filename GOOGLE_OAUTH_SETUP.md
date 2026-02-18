# Google OAuth Setup Guide

Follow these steps to set up Google OAuth for your CalmFlow application.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter project name: "CalmFlow" (or your preferred name)
5. Click "CREATE"
6. Wait for the project to be created

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and click "ENABLE"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "OAuth client ID"
3. If prompted, click "CONFIGURE CONSENT SCREEN" first:
   - Choose "External" for User Type
   - Fill in App name: "CalmFlow"
   - Add your email as User support email
   - Add your email as Developer contact
   - Click "SAVE AND CONTINUE" through all screens
   - Then go back to Credentials

4. Now create the OAuth Client ID:
   - Application type: "Web application"
   - Name: "CalmFlow Web"
   - Authorized JavaScript origins: Add `http://localhost:3000`
   - Authorized redirect URIs: Add `http://localhost:3000/api/auth/callback/google`
   - Click "CREATE"

5. Copy the credentials shown:
   - Client ID
   - Client Secret

## Step 4: Add Credentials to .env.local

Open `.env.local` in your project root and fill in:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=generate_a_random_string_here
NEXTAUTH_URL=http://localhost:3000
```

To generate NEXTAUTH_SECRET, run in terminal:
```bash
openssl rand -base64 32
```

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000

3. Click "Sign In" button

4. Click "Continue with Google"

5. You should be redirected to Google login

6. After login, you should be redirected back and see your name in the header

## For Production

When deploying to production:

1. Add your production domain to Google OAuth credentials:
   - Authorized JavaScript origins: Add `https://yourdomain.com`
   - Authorized redirect URIs: Add `https://yourdomain.com/api/auth/callback/google`

2. Update `.env.local` (or environment variables):
   ```
   NEXTAUTH_URL=https://yourdomain.com
   ```

## Troubleshooting

**"Redirect URI mismatch" error:**
- Make sure you've added the correct redirect URI to Google OAuth credentials
- Check that NEXTAUTH_URL matches your domain

**"Invalid client" error:**
- Double-check your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Make sure they're copied correctly from Google Cloud Console

**Session not persisting:**
- Make sure NEXTAUTH_SECRET is set
- Clear browser cookies and try again
