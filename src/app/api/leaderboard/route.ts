import { NextResponse } from "next/server";
import { getLeaderboard, getBestProjects } from "@/lib/sheets";

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();
    const bestProjectsW1 = await getBestProjects(1);
    const bestProjectsW2 = await getBestProjects(2);
    const bestProjectsW3 = await getBestProjects(3);

    return NextResponse.json({
      leaderboard,
      bestProjects: {
        1: bestProjectsW1,
        2: bestProjectsW2,
        3: bestProjectsW3
      }
    });
  } catch (error: any) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to load leaderboard data." },
      { status: 500 }
    );
  }
}
