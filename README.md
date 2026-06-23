# 🚀 ACM-W Build Accelerator 2026 Portal

Welcome to the official web portal for the **ACM-W SNU Build Accelerator 2026**. This platform enables participants to log in with their university credentials, submit weekly project builds, track their status, and view the global leaderboard.

The application is built with **Next.js** and integrates with **Google OAuth** for authentication and **Google Sheets API** as a lightweight, real-time database.

---

## 🛠️ Getting Started

### 1. Clone & Install Dependencies
First, clone the repository and install the project dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Copy the environment template or create a `.env.local` file in the root directory (see the [Configuration](#-configuration-envlocal) section below for detailed setup).

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🔑 Setup Guide

To run the portal with fully functioning login and submissions, you need to configure both **Google OAuth** and the **Google Sheets API**. Follow the detailed steps below.

### Part 1: Google OAuth Sign-In Setup

This enables secure sign-in, restricting access to SNU email domains (`@snu.edu.in`).

1. **Create a Google Cloud Project:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Click the project dropdown at the top of the screen and select **"New Project"**.
   - Name your project (e.g., `snu-acmw-build-accelerator`) and click **"Create"**.
   - Make sure your new project is selected in the top dropdown.

2. **Configure the OAuth Consent Screen:**
   - In the left sidebar, navigate to **APIs & Services** > **OAuth consent screen**.
   - Select the **User Type**:
     - **Internal:** (Recommended) Only users within your organization (e.g., `@snu.edu.in`) can log in. This fits perfectly with the SNU email restriction.
     - **External:** Anyone with a Google account can sign in (our application code will still filter out non-SNU emails).
   - Click **"Create"**.
   - Fill in the required fields:
     - **App name:** `ACM-W Build Accelerator 2026`
     - **User support email:** Select your email.
     - **Developer contact information:** Enter your email.
   - Click **"Save and Continue"**.
   - On the **Scopes** page, click **"Add or Remove Scopes"**:
     - Check the boxes for `.../auth/userinfo.email` and `.../auth/userinfo.profile`.
     - Scroll down and click **"Update"**.
   - Click **"Save and Continue"** through the remaining screens.

3. **Create Credentials (OAuth Client ID):**
   - In the left sidebar, navigate to **APIs & Services** > **Credentials**.
   - Click **"+ Create Credentials"** at the top and select **"OAuth client ID"**.
   - Under **Application type**, select **"Web application"**.
   - Set the **Name** (e.g., `ACM-W Web Client`).
   - Under **Authorized JavaScript origins**, click **"+ Add URI"**:
     - Add: `http://localhost:3000` (for local development)
     - Add: your production domain (e.g., `https://your-app.vercel.app` if deploying)
   - Under **Authorized redirect URIs**, click **"+ Add URI"**:
     - Add: `http://localhost:3000/api/auth/callback/google`
     - Add: your production redirect URL (e.g., `https://your-app.vercel.app/api/auth/callback/google`)
     
     > [!IMPORTANT]
     > Ensure the redirect URI matches the pattern `/api/auth/callback/google` exactly. This is the endpoint NextAuth uses to handle Google's sign-in response.
     
   - Click **"Create"**.
   - A modal will pop up displaying your **Client ID** and **Client Secret**. Copy these values for your `.env.local` file.

---

### Part 2: Google Sheets API Setup

This setup uses a Google Service Account to sync project submissions from the web portal into a Google Sheet in real time.

1. **Create a Google Service Account:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Navigate to **IAM & Admin** > **Service Accounts** in the left sidebar.
   - Click **"+ Create Service Account"** at the top.
   - Enter details:
     - **Service account name:** `acmw-sheets-sync`
     - **Service account description:** `Syncs project submissions to Google Sheets`
   - Click **"Create and Continue"** and then **"Done"**.

2. **Generate Service Account Key (JSON):**
   - In the Service Accounts list, click the email address of the service account you just created.
   - Go to the **"Keys"** tab.
   - Click **"Add Key"** > **"Create new key"**.
   - Choose **JSON** as the key type and click **"Create"**.
   - A JSON file will automatically download to your computer. Open this file and note down:
     - `client_email` (looks like: `acmw-sheets-sync@...gserviceaccount.com`)
     - `private_key` (begins with `-----BEGIN PRIVATE KEY-----\n...`)

3. **Enable Google Sheets API:**
   - In the Google Cloud Console, search for **Google Sheets API** in the search bar.
   - Click **"Enable"** to activate the API for your project.

4. **Create & Format the Google Sheet:**
   - Open [Google Sheets](https://sheets.google.com/) and create a **blank spreadsheet**.
   - Rename the first sheet tab to **`Sheet1`**.
   - In row 1, add the following exact headers from columns A to L:
     
     | Column | Header Name | Description |
     |---|---|---|
     | **A** | `Timestamp` | Submission date & time |
     | **B** | `User Name` | Student full name |
     | **C** | `User Email` | Student official SNU email |
     | **D** | `Week` | Week number (1, 2, or 3) |
     | **E** | `Project Title` | Submission project title |
     | **F** | `Project Domain` | Main focus or domain of the project (e.g. EdTech, FinTech, AI, Health) |
     | **G** | `GitHub Link` | Git repository URL |
     | **H** | `Prototype Link` | Deployed project live URL |
     | **I** | `Description` | Project details |
     | **J** | `Score` | Evaluation score (e.g., 90) |
     | **K** | `Rank` | Rank (1, 2, or 3) for the week |
     | **L** | `Status` | Status: `Submitted`, `Under Review`, `Shortlisted`, or `Ranked` |

5. **Share the Sheet with the Service Account:**
   - Click the blue **"Share"** button in the top-right corner of your Google Sheet.
   - In the "Add people and groups" box, paste the `client_email` address of your service account.
   - Ensure the permission is set to **"Editor"**.
   - Uncheck "Notify people" and click **"Share"**.

---

## ⚙️ Configuration (`.env.local`)

Create a `.env.local` file in the root directory and add the following keys:

```env
# NextAuth Settings
NEXTAUTH_SECRET=any_random_secure_long_hash_key_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_client_id_copied_from_google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_copied_from_google

# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_client_email_here
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_service_account_private_key_here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_spreadsheet_id_copied_from_sheet_url
```

> [!IMPORTANT]
> Make sure the `GOOGLE_PRIVATE_KEY` is wrapped in double quotes `"..."` and retains the `\n` linebreaks so Node.js can parse it properly.

---

## 🧪 Testing and Verification

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` and click **"Continue with Google"**.
   - Official `@snu.edu.in` accounts will successfully log in and redirect to the dashboard.
   - Non-SNU email accounts (e.g., `@gmail.com`) will be blocked and redirected back to the home page with a domain error message.
3. Submit a project under **Weeks** > **Week 1**.
4. Check your Google Sheet: a new row with the project details should immediately populate.
5. Visit the **Profile** tab inside the portal: your submission details, prototype link, and status will load directly from the Google Sheet in real time.
