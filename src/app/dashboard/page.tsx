import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import WeekTabs from "@/components/WeekTabs";
import ThemeSelector from "@/components/ThemeSelector";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <ThemeSelector theme="home" />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Timeline />
        <WeekTabs />
      </main>
      <footer className="bg-brand-card border-t border-brand-border py-10 text-center relative z-10">
        <p className="font-mono text-[10px] text-brand-muted tracking-wider">
          ACM-W SNU BUILD ACCELERATOR 2026 • DESIGNED FOR IMPACT
        </p>
      </footer>
    </div>
  );
}
