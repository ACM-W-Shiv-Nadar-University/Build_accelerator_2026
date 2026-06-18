# Google Sheets API Setup Guide

This guide explains how to set up the Google Sheets API to store program submissions in real time.

---

## Step 1: Create a Google Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project (e.g. `snu-acmw-summer-build`) from the top dropdown.
3. In the left sidebar, navigate to **IAM & Admin** > **Service Accounts**.
4. Click **"+ Create Service Account"** at the top.
5. Fill in the details:
   - **Service account name:** `acmw-sheets-sync`
   - **Service account ID:** (Auto-generated based on name)
   - **Service account description:** `Syncs project submissions to Google Sheets`
6. Click **"Create and Continue"**.
7. In the role selection, select **Project** > **Editor** (or you can skip assigning roles, as sheet-sharing handles permissions directly).
8. Click **"Done"**.

---

## Step 2: Generate Service Account Key (JSON)

1. In the Service Accounts list, click on the email address of the service account you just created.
2. Go to the **"Keys"** tab.
3. Click **"Add Key"** > **"Create new key"**.
4. Choose **JSON** as the key type and click **"Create"**.
5. A JSON file will automatically download to your computer. Open this file in your code editor. You will need two values from it:
   - `client_email` (looks like: `acmw-sheets-sync@...gserviceaccount.com`)
   - `private_key` (begins with `-----BEGIN PRIVATE KEY-----\n...`)

---

## Step 3: Create and Format the Google Sheet

1. Open [Google Sheets](https://sheets.google.com/) and create a **blank spreadsheet**.
2. Rename the first sheet tab to **`Sheet1`** (this is the default name, but double-check).
3. In row 1, add the following exact headers from columns A to L:
   
   | Column | Header Name | Description |
   |--------|-------------|-------------|
   | **A**  | `Timestamp` | Submission date & time |
   | **B**  | `User Name` | Student full name |
   | **C**  | `User Email`| Student official SNU email |
   | **D**  | `Week`      | Week number (1, 2, or 3) |
   | **E**  | `Project Title` | Submission project title |
   | **F**  | `Team Name` | Individual/Team builder name |
   | **G**  | `GitHub Link`| Git repository URL |
   | **H**  | `Prototype Link`| Deployed project live URL |
   | **I**  | `Description`| Project details |
   | **J**  | `Score`     | Evaluation score (e.g., 90) |
   | **K**  | `Rank`      | Rank (1, 2, or 3) for the week |
   | **L**  | `Status`    | Status: `Submitted`, `Under Review`, `Shortlisted`, or `Ranked` |

---

## Step 4: Share the Sheet with the Service Account

This is a critical step. If you miss this, Google will return an `AccessDenied` error.

1. Click the blue **"Share"** button in the top-right corner of your Google Sheet.
2. In the "Add people and groups" box, paste the `client_email` address of your service account (from Step 2).
3. Ensure the permission is set to **"Editor"**.
4. Uncheck "Notify people" and click **"Share"**.

---

## Step 5: Add Credentials to `.env.local`

1. Copy the Spreadsheet ID from the URL of your Google Sheet:
   - URL format: `https://docs.google.com/spreadsheets/d/SPSHEET_ID_HERE/edit#gid=0`
2. Open your project's `.env.local` file.
3. Paste the credentials:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=92be6b24acmwsummerbuildprogram2026f8f3ea
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=437114840887-j9je04k7ek9lpm7lgvm34p7fgh2v0cql.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_client_email_here
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_service_account_private_key_here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_spreadsheet_id_copied_from_sheet_url
```

> [!IMPORTANT]
> Make sure the `GOOGLE_PRIVATE_KEY` is wrapped in double quotes `"..."` and retains the `\n` linebreaks so Node.js can parse it properly.

---

## Step 6: Test Submissions & Verification

1. Start your local server:
   ```bash
   npm run dev
   ```
2. Log in using your Google account at `http://localhost:3000`.
3. Go to the **Weeks** section and select **Week 1**.
4. Fill out the submission form and click **"Submit Week 1 Project"**.
5. Check your Google Sheet: a new row with your project details should immediately appear!
6. Click **Profile** in the navbar: your submission details, prototype links, and status will now read directly from the Google Sheet and render on your profile page!
