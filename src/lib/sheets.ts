import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Define TypeScript interfaces for our submissions
export interface Submission {
  timestamp: string;
  userName: string;
  userEmail: string;
  week: number;
  projectTitle: string;
  teamName: string;
  githubLink: string;
  prototypeLink: string;
  description: string;
  score: number | null;
  rank: number | null;
  status: "Submitted" | "Under Review" | "Shortlisted" | "Ranked";
}

export interface LeaderboardEntry {
  userName: string;
  userEmail: string;
  week1Score: number | null;
  week2Score: number | null;
  week3Score: number | null;
  totalScore: number;
  rank: number;
}

// Local mock database path
const DB_DIR = path.join(process.cwd(), "src/data");
const DB_PATH = path.join(DB_DIR, "db.json");

// Helper to check if Google Sheets environment variables are present
function isGoogleSheetsConfigured(): boolean {
  return !!(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_SHEET_ID
  );
}

// Initialize the local JSON database if it doesn't exist
function initLocalDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialSubmissions: Submission[] = [];
    fs.writeFileSync(DB_PATH, JSON.stringify(initialSubmissions, null, 2), "utf-8");
  }
}

// Get Google Sheets client
function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  return google.sheets({ version: "v4", auth });
}

// Read all submissions
export async function getSubmissions(): Promise<Submission[]> {
  if (!isGoogleSheetsConfigured()) {
    // FALLBACK: Read from local JSON
    initLocalDb();
    const fileContent = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(fileContent);
  }

  try {
    const sheets = getSheetsClient();
    const sheetId = process.env.GOOGLE_SHEET_ID!;
    
    // We assume sheet is "Sheet1" and fetch all columns from A to L
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A2:L", // Skipping headers in row 1
    });

    const rows = response.data.values || [];
    
    return rows.map((row) => ({
      timestamp: row[0] || "",
      userName: row[1] || "",
      userEmail: row[2] || "",
      week: Number(row[3]) || 0,
      projectTitle: row[4] || "",
      teamName: row[5] || "",
      githubLink: row[6] || "",
      prototypeLink: row[7] || "",
      description: row[8] || "",
      score: row[9] ? Number(row[9]) : null,
      rank: row[10] ? Number(row[10]) : null,
      status: (row[11] as any) || "Submitted",
    }));
  } catch (error) {
    console.error("Google Sheets API error. Falling back to local DB.", error);
    initLocalDb();
    const fileContent = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(fileContent);
  }
}

// Save a new submission
export async function saveSubmission(submission: Omit<Submission, "score" | "rank" | "status">): Promise<void> {
  const fullSubmission: Submission = {
    ...submission,
    score: null,
    rank: null,
    status: "Submitted",
  };

  if (!isGoogleSheetsConfigured()) {
    // FALLBACK: Save to local JSON
    initLocalDb();
    const submissions = await getSubmissions();
    
    // Check duplication
    const duplicate = submissions.some(
      (s) => s.userEmail.toLowerCase() === submission.userEmail.toLowerCase() && s.week === submission.week
    );
    if (duplicate) {
      throw new Error("You have already submitted for this week.");
    }

    submissions.push(fullSubmission);
    fs.writeFileSync(DB_PATH, JSON.stringify(submissions, null, 2), "utf-8");
    return;
  }

  try {
    const sheets = getSheetsClient();
    const sheetId = process.env.GOOGLE_SHEET_ID!;
    
    // First, check duplicates by reading existing sheets data
    const existingSubmissions = await getSubmissions();
    const duplicate = existingSubmissions.some(
      (s) => s.userEmail.toLowerCase() === submission.userEmail.toLowerCase() && s.week === submission.week
    );
    if (duplicate) {
      throw new Error("You have already submitted for this week.");
    }

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:L",
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          fullSubmission.timestamp,
          fullSubmission.userName,
          fullSubmission.userEmail,
          fullSubmission.week,
          fullSubmission.projectTitle,
          fullSubmission.teamName,
          fullSubmission.githubLink,
          fullSubmission.prototypeLink,
          fullSubmission.description,
          "", // Score (empty initially)
          "", // Rank (empty initially)
          fullSubmission.status
        ]],
      },
    });
  } catch (error: any) {
    if (error.message === "You have already submitted for this week.") {
      throw error;
    }
    console.error("Google Sheets append error. Saving to local DB instead.", error);
    // Force write to local db on API failure
    initLocalDb();
    const fileContent = fs.readFileSync(DB_PATH, "utf-8");
    const submissions: Submission[] = JSON.parse(fileContent);
    submissions.push(fullSubmission);
    fs.writeFileSync(DB_PATH, JSON.stringify(submissions, null, 2), "utf-8");
  }
}

// Get Leaderboard calculations
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const submissions = await getSubmissions();
  
  // Group submissions by user email
  const userMap: { [email: string]: { name: string; weekScores: { [week: number]: number } } } = {};
  
  submissions.forEach((s) => {
    if (s.score === null || s.score === undefined) return;
    
    const email = s.userEmail.toLowerCase();
    if (!userMap[email]) {
      userMap[email] = {
        name: s.userName || s.teamName || "Student",
        weekScores: { 1: 0, 2: 0, 3: 0 },
      };
    }
    // Record score for the respective week
    if (s.week >= 1 && s.week <= 3) {
      userMap[email].weekScores[s.week] = Math.max(userMap[email].weekScores[s.week] || 0, s.score);
    }
  });

  const entries: LeaderboardEntry[] = Object.keys(userMap).map((email) => {
    const data = userMap[email];
    const w1 = data.weekScores[1] || null;
    const w2 = data.weekScores[2] || null;
    const w3 = data.weekScores[3] || null;
    const total = (w1 || 0) + (w2 || 0) + (w3 || 0);

    return {
      userName: data.name,
      userEmail: email,
      week1Score: w1,
      week2Score: w2,
      week3Score: w3,
      totalScore: total,
      rank: 0, // calculated next
    };
  });

  // Sort by total score descending
  entries.sort((a, b) => b.totalScore - a.totalScore);

  // Assign ranks
  let currentRank = 1;
  for (let i = 0; i < entries.length; i++) {
    if (i > 0 && entries[i].totalScore < entries[i - 1].totalScore) {
      currentRank = i + 1;
    }
    entries[i].rank = currentRank;
  }

  return entries;
}

// Get top 3 best projects for a specific week
export async function getBestProjects(week: number): Promise<Submission[]> {
  const submissions = await getSubmissions();
  
  // Filter submissions for this week that are ranked and have a rank between 1 and 3
  const ranked = submissions.filter(
    (s) => s.week === week && s.rank !== null && s.rank >= 1 && s.rank <= 3
  );

  // Sort by rank ascending
  return ranked.sort((a, b) => (a.rank || 99) - (b.rank || 99));
}
