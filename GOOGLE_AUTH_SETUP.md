# Google OAuth Sign-In Setup Guide

This guide explains how to set up Google OAuth (Google Login) for the **ACM-W Summer Build Program** website.

---

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Log in with your Google account.
3. Click the project dropdown at the top of the screen and select **"New Project"**.
4. Enter a project name (e.g., `snu-acmw-summer-build`) and click **"Create"**.
5. Once created, make sure you select your new project in the top dropdown.

---

## Step 2: Configure the OAuth Consent Screen

1. In the left sidebar, navigate to **APIs & Services** > **OAuth consent screen**.
2. Select the **User Type**:
   - **Internal:** (Recommended) Only users within your organization (e.g. `@snu.edu.in`) can log in. This fits perfectly with the SNU email restriction.
   - **External:** Anyone with a Google account can sign in (domain checking on our website will still filter out non-SNU emails).
3. Click **"Create"**.
4. Fill in the required fields:
   - **App name:** `ACM-W Summer Build Program`
   - **User support email:** Select your email.
   - **Developer contact information:** Enter your email.
5. Click **"Save and Continue"**.
6. On the **Scopes** page, click **"Add or Remove Scopes"**:
   - Check the boxes for `.../auth/userinfo.email` and `.../auth/userinfo.profile`.
   - Scroll down and click **"Update"**.
7. Click **"Save and Continue"** through the remaining screens.

---

## Step 3: Create Credentials (OAuth Client ID)

1. In the left sidebar, navigate to **APIs & Services** > **Credentials**.
2. Click **"+ Create Credentials"** at the top and select **"OAuth client ID"**.
3. Under **Application type**, select **"Web application"**.
4. Set the **Name** (e.g., `ACM-W Web Client`).
5. Under **Authorized JavaScript origins**, click **"+ Add URI"**:
   - Add: `http://localhost:3000` (for local development)
   - Add: your production domain (e.g., `https://your-app.vercel.app` if deploying)
6. Under **Authorized redirect URIs**, click **"+ Add URI"**:
   - Add: `http://localhost:3000/api/auth/callback/google`
   - Add: your production redirect URL (e.g., `https://your-app.vercel.app/api/auth/callback/google`)
   
   > [!IMPORTANT]
   > Ensure the redirect URI matches the pattern `/api/auth/callback/google` exactly. This is the endpoint NextAuth uses to handle Google's sign-in response.
   
7. Click **"Create"**.
8. A modal will pop up displaying your **Client ID** and **Client Secret**. Copy these values.

---

## Step 4: Configure Your Environment Variables

Create (or open) the `.env.local` file in the root of your project directory and add the credentials you just copied:

```env
# NextAuth settings
NEXTAUTH_SECRET=any_random_secure_long_hash_key_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_client_id_copied_from_google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_copied_from_google
```

---

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000).
3. Click the **"Continue with Google"** button.
4. Try logging in:
   - Logging in with an official `@snu.edu.in` email will successfully redirect you to the dashboard.
   - Logging in with a non-SNU email (e.g., `@gmail.com`) will redirect you back to the home page with the error message: `“Please login using your official SNU email ID.”`
