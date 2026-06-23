import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProfileSubmissionCard from "@/components/ProfileSubmissionCard";
import { getSubmissions } from "@/lib/sheets";
import Image from "next/image";
import { User } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  // Fetch all submissions and filter for this user
  const allSubmissions = await getSubmissions();
  const userSubmissions = allSubmissions.filter(
    (s) => s.userEmail.toLowerCase() === session.user!.email!.toLowerCase()
  );

  // Match submissions to respective weeks
  const week2Submission = userSubmissions.find((s) => s.week === 2);
  const week3Submission = userSubmissions.find((s) => s.week === 3);
  const week4Submission = userSubmissions.find((s) => s.week === 4);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <ThemeSelector theme="default" />
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Simple User Details Section */}
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            {/* Profile image (Google avatar or Dicebear fallback) */}
            <div className="relative w-20 h-20 rounded-full border-thin overflow-hidden bg-brand-bg flex items-center justify-center">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} className="text-brand-blue" />
              )}
            </div>

            {/* Profile Metadata */}
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text">
                {session.user.name || "SNU Student"}
              </h2>
              <p className="font-mono text-xs text-brand-blue tracking-wider">
                {session.user.email}
              </p>
              <div className="inline-flex items-center gap-1.5 pt-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] tracking-wider text-brand-muted uppercase font-bold">
                  Verified SNU Account
                </span>
              </div>
            </div>
          </div>

          {/* Submissions Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-sans font-bold text-lg text-brand-text mb-1">
                Your Submissions
              </h3>
              <p className="text-xs text-brand-muted">
                Track status and scores of your weekly building sprints.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ProfileSubmissionCard weekNumber={2} submission={week2Submission} />
              <ProfileSubmissionCard weekNumber={3} submission={week3Submission} />
              <ProfileSubmissionCard weekNumber={4} submission={week4Submission} />
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-brand-card border-t border-brand-border py-8 text-center mt-auto">
        <p className="font-mono text-[10px] text-brand-muted tracking-wider">
          ACM-W SNU BUILD ACCELERATOR 2026 • PROFILE & SUBMISSIONS
        </p>
      </footer>
    </div>
  );
}
