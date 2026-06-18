import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Trophy } from "lucide-react";

export default async function LeaderboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 border border-brand-orange/20 rounded-full mb-4">
              <Trophy className="text-brand-orange" size={24} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight mb-3">
              Program Leaderboard
            </h1>
            <p className="text-sm text-brand-muted max-w-lg mx-auto leading-relaxed">
              Real-time standings for all participants in the ACM-W Summer Build Program. Rank calculations are based on weekly evaluation scores.
            </p>
            <div className="w-12 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
          </div>

          {/* Table */}
          <LeaderboardTable />
        </div>
      </main>
      <footer className="bg-brand-card border-t border-brand-border py-8 text-center mt-auto">
        <p className="font-mono text-[10px] text-brand-muted tracking-wider">
          ACM-W SNU SUMMER BUILD PROGRAM 2026 • WORK HARD, BUILD MORE
        </p>
      </footer>
    </div>
  );
}
