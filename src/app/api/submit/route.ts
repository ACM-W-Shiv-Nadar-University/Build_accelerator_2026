import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { saveSubmission } from "@/lib/sheets";
import { isWeekUnlocked } from "@/config/program";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { week, projectTitle, projectDomain, githubLink, prototypeLink, description } = body;

    // Validate fields
    if (!week || !projectTitle || !projectDomain || !githubLink || !description) {
      return NextResponse.json(
        { error: "All required fields must be completed." },
        { status: 400 }
      );
    }

    const weekNum = Number(week);
    
    // Check if the week is unlocked
    if (!isWeekUnlocked(weekNum)) {
      return NextResponse.json(
        { error: `Week ${weekNum} challenge is currently locked.` },
        { status: 400 }
      );
    }

    // Attempt to save submission (lib handles sheets / local files and duplicate checking)
    try {
      await saveSubmission({
        timestamp: new Date().toISOString(),
        userName: session.user.name || "Student",
        userEmail: session.user.email,
        week: weekNum,
        projectTitle: projectTitle.trim(),
        projectDomain: projectDomain.trim(),
        githubLink: githubLink.trim(),
        prototypeLink: prototypeLink?.trim() || "",
        description: description.trim(),
      });
      
      return NextResponse.json({
        message: "Your project has been submitted successfully."
      });
    } catch (dbError: any) {
      if (dbError.message === "You have already submitted for this week.") {
        return NextResponse.json(
          { error: "You have already submitted for this week." },
          { status: 400 }
        );
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error("Submission API Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during submission." },
      { status: 500 }
    );
  }
}
