import { NextResponse } from "next/server";
import { getLeaderboard, getBestProjects } from "@/lib/sheets";

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();
    const bestProjectsW2 = await getBestProjects(2);
    const bestProjectsW3 = await getBestProjects(3);
    const bestProjectsW4 = await getBestProjects(4);

    return NextResponse.json({
      leaderboard,
      bestProjects: {
        2: bestProjectsW2,
        3: bestProjectsW3,
        4: bestProjectsW4
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
