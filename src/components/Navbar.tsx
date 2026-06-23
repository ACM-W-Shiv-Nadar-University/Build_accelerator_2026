"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Trophy, User, LogOut, Menu, X, Calendar, Layers } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/dashboard") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/dashboard#${sectionId}`);
    }
  };

  if (!session) return null; // Only show Navbar if logged in

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2 group transition-all duration-300 hover:scale-[1.03]">
              <Image
                src="/acmw-logo.png"
                alt="ACM-W SNIoE Logo"
                width={130}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick("timeline")}
              className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
            >
              <Calendar size={14} className="text-brand-blue" />
              TIMELINE
            </button>
            <button
              onClick={() => handleNavClick("weeks")}
              className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
            >
              <Layers size={14} className="text-brand-blue" />
              WEEKS
            </button>
            
            <span className="h-4 w-[1px] bg-brand-border" />

            <Link
              href="/leaderboard"
              className={`flex items-center gap-1.5 text-xs font-mono tracking-wider transition-colors ${
                pathname === "/leaderboard"
                  ? "text-brand-blue font-bold"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <Trophy size={14} />
              LEADERBOARD
            </Link>

            <Link
              href="/profile"
              className={`flex items-center gap-1.5 text-xs font-mono tracking-wider transition-colors ${
                pathname === "/profile"
                  ? "text-brand-blue font-bold"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <User size={14} />
              PROFILE
            </Link>

            <span className="h-4 w-[1px] bg-brand-border" />

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-brand-muted hover:text-brand-blue transition-colors border border-brand-border px-3 py-1.5 rounded-full hover:bg-brand-card cursor-pointer"
            >
              <LogOut size={13} />
              LOGOUT
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-text hover:text-brand-blue p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-bg border-b border-brand-border animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <button
              onClick={() => handleNavClick("timeline")}
              className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-mono tracking-wider text-brand-muted hover:text-brand-text hover:bg-brand-card rounded-md"
            >
              <Calendar size={16} className="text-brand-blue" />
              TIMELINE
            </button>
            <button
              onClick={() => handleNavClick("weeks")}
              className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-mono tracking-wider text-brand-muted hover:text-brand-text hover:bg-brand-card rounded-md"
            >
              <Layers size={16} className="text-brand-blue" />
              WEEKS
            </button>
            <Link
              href="/leaderboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-mono tracking-wider rounded-md ${
                pathname === "/leaderboard"
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-brand-muted hover:text-brand-text hover:bg-brand-card"
              }`}
            >
              <Trophy size={16} />
              LEADERBOARD
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-mono tracking-wider rounded-md ${
                pathname === "/profile"
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-brand-muted hover:text-brand-text hover:bg-brand-card"
              }`}
            >
              <User size={16} />
              PROFILE
            </Link>
            <div className="border-t border-brand-border my-2" />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-mono tracking-wider text-brand-muted hover:text-brand-blue hover:bg-brand-card rounded-md"
            >
              <LogOut size={16} />
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
